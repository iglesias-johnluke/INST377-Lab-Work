const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const data = []; // array of results from our fetch

/* fetch all json data in url, push json to results array,
results is an array of maps, each index holds map for a 
respective inspection */
fetch(url)
  .then((response) => response.json())
  // eslint-disable-next-line max-len
  .then((json) => data.push(...json)); // ... spreads every json entry into results array so entire json is not at results[0]
console.log(data);

/* returns matches from results array according to 
wordToMatch, will search for matches according to inspection
entity name, category, address */
// eslint-disable-next-line no-shadow
function findMatches(wordToMatch, results) {
  return results.filter((inspection) => { 
    const regex = new RegExp(wordToMatch, 'gi');// wordToMatch is regex which is case insensitive
    // return array of inspection match of either inspection city or state
    return inspection.city.match(regex) || inspection.state.match(regex);
  });
}
/* display search results whenever user changes input */
function displayMatches() {
  /* matchArray contains matches of this.value (current
    user_input) within data array */
  const matchArray = findMatches(this.value, data);
  console.log(matchArray);
//   const html = matchArray.map((inspection) => {
//     let list = document.createElement('ul');
//     let listItem = document.createElement('li');
//     let text = document.createTextNode(inspection.city, inspection.state);
//     listItem.appendChild(text);
//     list.appendChild(listItem);
//     document.body.appendChild()

//     return document.append()
//   });
}

const searchInput = document.querySelector('#user_input');

// displayMatches whenever user input changes
searchInput.addEventListener('change', displayMatches);