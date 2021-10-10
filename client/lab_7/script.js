/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  const marker = L.marker([51.5, -0.09]).addTo(mymap);
}

// async function dataHandler() {

// }

mapInit();
async function windowActions() {
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
    const matchArray = findMatches(event.target.value, data);
    console.log(matchArray);
    const html = matchArray.map((inspection) => // return list item elements for every index in matchArray
        `<li style="font-size:25px">
            <span class="name">${inspection.name}<br>
                ${inspection.category}<br>
            <em>
                ${inspection.address_line_1}<br>
                ${inspection.city},
                <br>${inspection.zip}<br><br>
            </em>
            </span>
        </li>
            `).join(''); // convert array of matches to string
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('#user_input');

  // displayMatches whenever user input changes
  searchInput.addEventListener('change', displayMatches);
}
window.onload = windowActions;