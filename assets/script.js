// Sean Wallace September 2022
// DOM
var locationName = document.getElementById("location-name");
var tableContainer = document.getElementById("table-container");
var buttonFetchPropertyList = document.getElementById("button-fetch-property-list");
var properties = [];

// RENDERED DOM
var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;
var tableRow;
var tableDataRowIndex = 0;
var tableCell;
var tableCellToolTip;
var tableButtonAddToShortList;
var tablePropertyListBodyButtonIndex = 0;

// CONDITIONALS
var booleanFirstFetch = true;
var booleanCreateButton = true;
var booleanVisible = true;

function addColumnToTableHead(tableRow, booleanVisible, textContent) {
    tableCell = document.createElement("th");
    tableCell.setAttribute("scope", "col");
    if (!booleanVisible) {
        tableCell.setAttribute("class", "hide");        // materializecss.com
    }
    tableCell.textContent = textContent;
    tableRow.appendChild(tableCell);
};

function addColumnToTableRow(tableRow, booleanVisible, booleanCreateButton, textContent) {
    if (!booleanVisible && booleanCreateButton) {
        console.log("You are creating an invisible button! This seems inappropriate.")
    };
    tableCell = document.createElement("td");
    tableCell.setAttribute("scope", "col");
    if (!booleanVisible) {
        tableCell.setAttribute("class", "hide");        // materializecss.com
    };
    if (booleanCreateButton) {
        // tableCell.textContent = textContent;
        tableButtonAddToShortList = document.createElement('button');
        tableButtonAddToShortList.setAttribute("type", "button");
        tableButtonAddToShortList.setAttribute("title", textContent);       // review attribute name "title" later; this is a sprint!
        // tableButtonAddToShortList.setAttribute("class", "Btn btn-primary far fa-save");
        tableButtonAddToShortList.setAttribute("class", "Btn btn-location fa-solid fa-heart");
        tableButtonAddToShortList.setAttribute("id", "btn-location" + tablePropertyListBodyButtonIndex);
        tableCell.appendChild(tableButtonAddToShortList);
        // pass unique button id to click function
        tableButtonAddToShortList.addEventListener("click", (e) => {
            btnLocationClick(e, e.target.id);
        });
        tablePropertyListBodyButtonIndex++;                 // yes I know it's a global variable but this is a sprint!
    }
    else {
        tableCell.textContent = textContent;
    };
    tableRow.appendChild(tableCell);
};

// create the table, add thead, add empty tbody
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

    // addColumnToTableHead(tableRow, !booleanVisible, "Latitude");
    // addColumnToTableHead(tableRow, !booleanVisible, "Longitude");
    addColumnToTableHead(tableRow, booleanVisible, "Address");
    addColumnToTableHead(tableRow, booleanVisible, "Property Type");
    addColumnToTableHead(tableRow, booleanVisible, "Price Details");
    addColumnToTableHead(tableRow, booleanVisible, "Real Estate Agent");
    addColumnToTableHead(tableRow, booleanVisible, "Shortlist?");

    // append body to table
    tablePropertyListBody = document.createElement("tbody");
    tablePropertyListBody.setAttribute("id", "tbody");
    tablePropertyList.appendChild(tablePropertyListBody);

    // at the start of building the table make sure the index pointers are flushed
    tableDataRowIndex = 0;
    tablePropertyListBodyButtonIndex = 0;                 // yes I know it's a global variable but this is a sprint!
};

// add data rows to created table
function renderPropertyListTableRow(data) {
    // append data row
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    tableRow.setAttribute("id", "data-row" + tableDataRowIndex);
    tablePropertyListBody.appendChild(tableRow);

    // addColumnToTableRow(tableRow, !booleanVisible, !booleanCreateButton, data.propertyDetails.latitude);
    // addColumnToTableRow(tableRow, !booleanVisible, !booleanCreateButton, data.propertyDetails.longitude);
    // addColumnToTableRow(tableRow,  booleanVisible, !booleanCreateButton, "test");
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.propertyDetails.displayableAddress);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.propertyDetails.propertyType);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.priceDetails.displayPrice);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.advertiser.name);
    addColumnToTableRow(tableRow, booleanVisible, booleanCreateButton, data.headline);

    tablePropertyListBody.append(tableRow);
    tableDataRowIndex++;
};

function fetchResidentialProperties(suburbToFetch) {

    $('body').css('cursor', 'wait');

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
            if (data.length === 0) {
                console.log('domain API returned zero rows');
            }
            else {
                properties = (data);
                // console.log(properties);
                data.forEach(function (result) {
                    renderPropertyListTableRow(result.listing);
                });
            }
        })
        .catch((error) => {
            console.log(error)
        })
    $('body').css('cursor', 'default');
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
        // console.log("Keypress")
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        buttonFetchPropertyList.click();
    }
});

// Execute shortlist button
function btnLocationClick(event, buttonId) {
    event.preventDefault();
    event.stopPropagation();

    // use the dynamic button number to target the row number in the properties array
    // var rowNumber = buttonId.slice(-1);
    var chosenPropertyRowNumber = buttonId.match(/\d+/);
    // console.log(properties[chosenPropertyRowNumber])

    storeShortlistProperty(properties[chosenPropertyRowNumber]);

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