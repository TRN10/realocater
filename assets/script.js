// Sean Wallace September 2022
// DOM
var locationName = document.getElementById("location-name");
var tableContainer = document.getElementById("table-container");
var buttonFetchPropertyList = document.getElementById("button-fetch-property-list");

// RENDERED DOM
var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;
var tableRow;
var tableCell;
var tableCellToolTip;
var tableButtonAddToShortList;
var tablePropertyListBodyButtonIndex = 0;

// CONDITIONALS
var booleanFirstFetch = true;
var booleanCreateButton = true;

function addColumnToTableHead(tableRow, textContent, booleanInvisible) {
    tableCell = document.createElement("th");
    tableCell.setAttribute("scope", "col");
    // if (booleanInvisible) {

    // }
    tableCell.textContent = textContent;
    tableRow.appendChild(tableCell);
};

function addColumnToTableRow(tableRow, booleanCreateButton, textContent) {
    if (booleanCreateButton) {
        tableCell = document.createElement("td");
        tableCell.setAttribute("scope", "col");
        // tableCell.textContent = textContent;
        tableRow.appendChild(tableCell);
        tableButtonAddToShortList = document.createElement('button');
        tableButtonAddToShortList.setAttribute("type", "button");
        tableButtonAddToShortList.setAttribute("title", textContent);       // review attribute name "title" later; this is a sprint!
        // tableButtonAddToShortList.setAttribute("class", "Btn btn-primary far fa-save");
        tableButtonAddToShortList.setAttribute("class", "Btn btn-location fa-solid fa-heart");
        tableButtonAddToShortList.setAttribute("id", "btn-location" + tablePropertyListBodyButtonIndex);
        tableCell.appendChild(tableButtonAddToShortList);
        tablePropertyListBodyButtonIndex++;                 // yes I know it's a global variable but this is a sprint!
        // pass unique button id to click function
        tableButtonAddToShortList.addEventListener('click', (e)=>{

            btnLocationClick(e, e.target.id);
        });
    }
    else {
        tableCell = document.createElement("td");
        tableCell.setAttribute("scope", "col");
        tableCell.textContent = textContent;
        tableRow.appendChild(tableCell);
    }
};

function renderPropertyListTable() {
    if (booleanFirstFetch) {
        booleanFirstFetch = false;
    } else {
        tablePropertyList.remove();
    }

    // append table to its container
    tablePropertyList = document.createElement("table");
    tablePropertyList.setAttribute("id", "table-property-list");
    tablePropertyList.setAttribute("class", "striped");
    tableContainer.appendChild(tablePropertyList);

    // append head to table
    tablePropertyListHead = document.createElement("thead");
    tablePropertyListHead.setAttribute("id", "thead");
    tablePropertyList.appendChild(tablePropertyListHead);

    // append row to table head
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    tablePropertyListHead.appendChild(tableRow);

    addColumnToTableHead(tableRow, "Address");
    addColumnToTableHead(tableRow, "Property Type");
    addColumnToTableHead(tableRow, "Price Details");
    addColumnToTableHead(tableRow, "Real Estate Agent");
    addColumnToTableHead(tableRow, "Shortlist?");
    addColumnToTableHead(tableRow, "Latitude");
    addColumnToTableHead(tableRow, "Longitude");

    // append body to table
    tablePropertyListBody = document.createElement("tbody");
    tablePropertyListBody.setAttribute("id", "tbody");
    tablePropertyList.appendChild(tablePropertyListBody);
};

function renderPropertyListTableRow(data) {
    // append data row
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    tablePropertyListBody.appendChild(tableRow);

    addColumnToTableRow(tableRow, !booleanCreateButton, data.propertyDetails.displayableAddress);
    addColumnToTableRow(tableRow, !booleanCreateButton, data.propertyDetails.propertyType);
    addColumnToTableRow(tableRow, !booleanCreateButton, data.priceDetails.displayPrice);
    addColumnToTableRow(tableRow, !booleanCreateButton, data.advertiser.name);
    addColumnToTableRow(tableRow, booleanCreateButton, data.headline);
    addColumnToTableRow(tableRow, !booleanCreateButton, data.propertyDetails.latitude);
    addColumnToTableRow(tableRow, !booleanCreateButton, data.propertyDetails.longitude);

    tablePropertyListBody.append(tableRow);
};

function fetchResidentialProperties(suburbToFetch) {

    renderPropertyListTable();

    fetch("https://api.domain.com.au/v1/listings/residential/_search?api_key=key_daead3aa93fcc658fb277dc12fbdb47e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "listingType": "Sale",
            // "propertyTypes":["House", "NewApartments"],
            "propertyTypes": [],
            "minBedrooms": 1,
            "minBathrooms": 1,
            "minCarspaces": 0,
            "locations": [{ "state": "", "region": "", "area": "", "suburb": suburbToFetch, "postCode": "", "includeSurroundingSuburbs": false }]
        })
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            data.forEach(function (result) {
                // console.log(result.listing);
                renderPropertyListTableRow(result.listing);
            })
            // .catch???
            console.log(data);
        })
};

buttonFetchPropertyList.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetchResidentialProperties(locationName.value);
});

// Execute a function when the user presses a key on the keyboard
locationName.addEventListener("keypress", function (event) {

    // If the user presses the “Enter” key on the keyboard
    if (event.key === "Enter") {
        console.log("Keypress")
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        buttonFetchPropertyList.click();
    }
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


        // window.addEventListener("click",function() {
            // tableButtonAddToShortList.addEventListener("click",function() {
            //     // btnLocationClick();
            //     console.log(tableButtonAddToShortList.id);
            // });


// Execute shortlist button
// function btnLocationClick (event) {
function btnLocationClick (event, buttonId) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(event.id);
    console.log(buttonId);


    // var theLatitude = buttonId.parent()

    // var btnClicked = $(event.target);
	// console.log(btnClicked);
	// console.log(btnClicked.textContent);


	// event.target.preventDefault();
	// event.target.stopPropagation();


    
    // var btnClickedId = document.getElementById("")

	// var timeBLock = btnClicked.parent().prev().prev().text();
	// //				<button 	<td	 	<td   
	// var eventActivity = btnClicked.parent().prev().text();																
	// console.log('data in= '+ timeBLock);	console.log('data in= '+ eventActivity);	
	// saveSchedule(timeBLock, eventActivity);
}
