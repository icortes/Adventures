'use strict';

/**
 * Fills categories select element with categories array.
 * @param {HTMLElement} activityCategory
 */
function fillActivityCategories(activityCategory) {
  //for each item in categories append to activity category dropdown
  categories.forEach((category) => {
    activityCategory.appendChild(new Option(category, category));
  });
}

function onCategorySelect(activityCategory) {
  let activitiesDisplay = document.getElementById('activitiesDisplay');
  let tbody = document.getElementById('activitiesTableBody');
  activityCategory.addEventListener('change', () => {
    tbody.innerHTML = '';
    console.log(`User selected: ${activityCategory.value}`);
    if (activityCategory.value != '') {
      //filter activities and only get objects that match same category value
      let filteredActivities = activities.filter(
        (activity) => activity.category == activityCategory.value
      );
      console.log(activityCategory.value + ' Activities');
      console.table(filteredActivities);
      //fill in table body with filteredActivities
      filteredActivities.forEach((activity) => buildActivityRow(tbody, activity));
      showElement(activitiesDisplay);
    } else {
      hideElement(activitiesDisplay);
    }
  });
}

function buildActivityRow(tbody, activity) {
  // Create an empty <tr> element and add it to the last
  // position of the table
  let row = tbody.insertRow(-1);
  // Create new cells (<td> elements) and add text
  let cellId = row.insertCell(0);
  cellId.textContent = activity.id;
  let cellCategory = row.insertCell(1);
  cellCategory.textContent = activity.category;
  let cellName = row.insertCell(2);
  cellName.textContent = activity.name;
  let cellDescription = row.insertCell(3);
  cellDescription.textContent = activity.description;
  let cellLocation = row.insertCell(4);
  cellLocation.textContent = activity.location;
  let cellPrice = row.insertCell(5);
  cellPrice.textContent = '$' + activity.price;
}

/**
 * Hides element in DOM adding bootstrap class 'd-none'
 * @param {HTMLElement} element
 */
function hideElement(element) {
  element.classList.add('d-none');
}
/**
 * Shows element in DOM by removing bootstrap class 'd-none'
 * @param {HTMLElement} element
 */
function showElement(element) {
  element.classList.remove('d-none');
}

//run this code on page load
onload = () => {
  let activityCategory = document.getElementById('activityCategory');

  fillActivityCategories(activityCategory);
  onCategorySelect(activityCategory);
};
