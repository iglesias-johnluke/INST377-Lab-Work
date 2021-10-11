/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
let mymap = null;

function mapInit() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamlnbG9vIiwiYSI6ImNrdWx6Mjh0MTNuNzMycm8xdTQxODU3bG0ifQ.KSI97gxEQ_u9jF0hHA1G5g'
  }).addTo(mymap);
}

mapInit();

/* data handler accepts form user input and outputs
results in suggestion div */
async function dataHandler() {
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const suggestions = document.querySelector('.suggestions');// suggestions div will contain query results
  data = [];

  /* fetch all json data in url, push json to results array,
    results is an array of maps, each index holds map for a
    respective inspection */
  var request = await fetch(url);
  if (request.ok) {
    data = await request.json();
  }

  /* returns matches from results array according to
    wordToMatch, will search for matches according to inspection
    entity name, category, address */
  // eslint-disable-next-line no-shadow
  function findMatches(wordToMatch, results) {
    return results.filter((inspection) => {
      const regex = new RegExp(wordToMatch, 'gi');// wordToMatch is regex which is case insensitive
      // return array of inspection match of either inspection city or state
      return inspection.city.match(regex) || inspection.address_line_1.match(regex)
                    || inspection.zip.match(regex) || inspection.name.match(regex);
    });
  }
  /* display search results whenever user changes input */
  function displayMatches(event) {
    /* matchArray contains matches of this.value (current
            user_input) within data array */
    let matchCount = 0;
    const allMatches = findMatches(event.target.value, data);
    const matchArray = [];
    let viewCoordinate1;
    let viewCoordinate2;

    allMatches.forEach((element) => { /* matchArray contains matches containing coordinates */
        if (matchCount < 5 && element.geocoded_column_1 !== undefined) {
            matchArray[matchCount] = element;
            matchCount++;
            L.marker( [element.geocoded_column_1.coordinates[1], 
                element.geocoded_column_1.coordinates[0]] ).addTo(mymap);/* set map markers */
        }
    });

    viewCoordinate1 = matchArray[0].geocoded_column_1.coordinates[1];/* set coordinates of map */
    viewCoordinate2 = matchArray[0].geocoded_column_1.coordinates[0];
    mymap.setView([viewCoordinate1, viewCoordinate2], 13);/* set map view */
    
    const html = matchArray.map((inspection) => // return list item elements for every index in matchArray
        `<li style="font-size:25px">
            <span class="name">${inspection.name}<br>
                <em>${inspection.address_line_1}<br> 
            </span>
        </li>
            `).join(''); // convert array of matches to string
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('#user_input');

  // displayMatches whenever user input changes
  searchInput.addEventListener('change', displayMatches);
}
window.onload = dataHandler;