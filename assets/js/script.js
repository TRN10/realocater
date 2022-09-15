// Sean Wallace September 2022
// DOM
var locationState = document.getElementById("location-state");
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
var booleanCreateButton = true;
var booleanVisible = true;                              // this flag may be used in the future; all dynamic columns are visible in this cut of code

// 2 DYNAMIC COLUMNS FUNCTIONS
function addColumnToTableHead(tableRow, booleanVisible, textContent) {
    // create a cell
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

    // create a cell
    tableCell = document.createElement("td");
    tableCell.setAttribute("scope", "col");

    if (!booleanVisible) {
        tableCell.setAttribute("class", "hide");        // materializecss.com
    };

    if (booleanCreateButton) {
        // tableCell.textContent = textContent;         // assume buttons do not need text
        tableButtonAddToShortList = document.createElement("button");
        tableButtonAddToShortList.setAttribute("type", "button");
        tableButtonAddToShortList.setAttribute("title", textContent);       // to do: review attribute name "title" later; this is a sprint!
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

// 2 DYNAMIC TABLE FUNCTIONS AND 1 FETCH FUNCTION
// create the table, add thead, add empty tbody
function renderPropertyListTable() {

    // append table to its container
    tablePropertyList = document.createElement("table");
    tablePropertyList.setAttribute("id", "table-property-list");
    tablePropertyList.setAttribute("class", "striped, responsive-table");
    tableContainer.appendChild(tablePropertyList);

    // append head to table
    tablePropertyListHead = document.createElement("thead");
    tablePropertyListHead.setAttribute("id", "thead");
    tablePropertyList.appendChild(tablePropertyListHead);

    // append row to table head
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope", "row");
    tablePropertyListHead.appendChild(tableRow);

    addColumnToTableHead(tableRow, booleanVisible, "Address");
    addColumnToTableHead(tableRow, booleanVisible, "State");
    addColumnToTableHead(tableRow, booleanVisible, "Property Type");
    addColumnToTableHead(tableRow, booleanVisible, "Price Details");
    addColumnToTableHead(tableRow, booleanVisible, "Real Estate Agent");
    addColumnToTableHead(tableRow, booleanVisible, "Shortlist?");

    // append body to table
    tablePropertyListBody = document.createElement("tbody");
    tablePropertyListBody.setAttribute("id", "tbody");
    tablePropertyList.appendChild(tablePropertyListBody);

    // flush the index pointers for the data section of the table before it gets generated 
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

    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.propertyDetails.displayableAddress);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.propertyDetails.state);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.propertyDetails.propertyType);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.priceDetails.displayPrice);
    addColumnToTableRow(tableRow, booleanVisible, !booleanCreateButton, data.advertiser.name);
    addColumnToTableRow(tableRow, booleanVisible, booleanCreateButton, data.headline);

    tablePropertyListBody.append(tableRow);
    tableDataRowIndex++;
};

// FETCH TO POPULATE TABLE
function fetchResidentialProperties(stateToFetch, suburbToFetch) {

    $("body").css("cursor", "wait");

    if (tablePropertyList) {
        tablePropertyList.remove();
    }

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
            "locations": [{ "state": stateToFetch, "region": "", "area": "", "suburb": suburbToFetch, "postCode": "", "includeSurroundingSuburbs": false }]
        })
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (propertiesFetched) {
            if (propertiesFetched.length === 0) {
                console.log("domain API returned no properties rows");
                showRealocatorModalDialog("#dialog-fetch-empty");
            }
            else {

                renderPropertyListTable();
                properties = propertiesFetched; // global variable set to parse into storage, after MVP this should be a parameter

                propertiesFetched.forEach(function (result) {
                    // for the MVP we are only processing result.type === "PropertyListing"
                    if (result.type === "Project") {
                        console.log("result.type Project to be done another time. This logic still meets MVP.");
                    } else if (result.type === "PropertyListing") {
                        renderPropertyListTableRow(result.listing);
                        document.getElementById("table-container").scrollIntoView();
                    } else {
                        console.log("the API has an unexpected result.type");
                    };

                });
            }
        })
        .catch((error) => {
            console.log(error)
        })
    $("body").css("cursor", "default");
};

// Excute the fetch (shown as "search") button 
buttonFetchPropertyList.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (locationState.value == "placeholder" || locationName.value == "") {
        showRealocatorModalDialog("#dialog-state-and-name");
    } else {
        fetchResidentialProperties(locationState.value, locationName.value);
    }
});

// Execute press of Enter key only
locationName.addEventListener("keypress", function (event) {
    // If the user presses the “Enter” key on the keyboard
    if (event.key === "Enter") {
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
    var chosenPropertyRowNumber = buttonId.match(/\d+/);
    console.log(chosenPropertyRowNumber);

    // global array set in fetchResidentialProperties; MVP!
    storeShortlistProperty(properties[chosenPropertyRowNumber]);
}

// Dialog render function
function showRealocatorModalDialog(dialogElementId) {
    // dialogElementId = "#dialog-state-and-name" or "#dialog-fetch-empty"
    // the text and buttons are defined in the HTML
    // the button must be class="close", it's a sprint!
    var modal = document.querySelector(dialogElementId);
    modal.showModal();
    var closeBtns = document.getElementsByClassName("close");
    for (btn of closeBtns) {
        btn.addEventListener("click", () => {
            modal.close();
        })
    };
}