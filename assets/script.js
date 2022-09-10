// DOM
var suburbSelected = document.getElementById("suburb");
var stateSelected = document.getElementById("state");
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

// CONDITIONALS
var booleanFirstFetch = true;
var booleanCreateButton = true;

function addColumnToTableHead(textContent) {
    tableCell = document.createElement("th");
    tableCell.setAttribute("scope","col");
    tableCell.textContent = textContent;
    tableRow.appendChild(tableCell);
};

function addColumnToTableRow(booleanCreateButton, textContent) {
    if (booleanCreateButton) {
        tableCell = document.createElement("td");
        tableCell.setAttribute("scope","col");
        // tableCell.textContent = textContent;
        tableRow.appendChild(tableCell);
        tableButtonAddToShortList = document.createElement('button');
        tableButtonAddToShortList.setAttribute("type", "button");
        tableButtonAddToShortList.setAttribute("title", "add-to-shortlist");
        tableButtonAddToShortList.setAttribute("class", "Btn btn-primary far fa-save");
        tableCell.appendChild(tableButtonAddToShortList);
    }
    else {
        tableCell = document.createElement("td");
        tableCell.setAttribute("scope","col");
        tableCell.textContent = textContent;
        tableRow.appendChild(tableCell);            
    }
};

function renderPropertyListTable () {
    if (booleanFirstFetch) {
        booleanFirstFetch = false;
    } else {
        tablePropertyList.innerHTML = "";
    }

    // append table to its container
    tablePropertyList = document.createElement("table");
    tablePropertyList.setAttribute("id","table-property-list");
    tableContainer.appendChild(tablePropertyList);

    // append head to table
    tablePropertyListHead = document.createElement("thead");
    tablePropertyListHead.setAttribute("id","thead");
    tablePropertyList.appendChild(tablePropertyListHead);

    // append row to table head
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope","row");
    tablePropertyListHead.appendChild(tableRow);    

    addColumnToTableHead("Street Number");
    addColumnToTableHead("Street Name");
    addColumnToTableHead("Property Type");
    addColumnToTableHead("Shortlist?");

    // append body to table
    tablePropertyListBody = document.createElement("tbody");
    tablePropertyListBody.setAttribute("id","tbody");
    tablePropertyList.appendChild(tablePropertyListBody);
};

function renderPropertyListTableRow(data) {
    // append data row
    tableRow = document.createElement("tr");
    tableRow.setAttribute("scope","row");
    tablePropertyListBody.appendChild(tableRow);

    addColumnToTableRow(!booleanCreateButton, data.propertyDetails.streetNumber);
    addColumnToTableRow(!booleanCreateButton, data.propertyDetails.street);
    addColumnToTableRow(!booleanCreateButton, data.propertyDetails.propertyType);
    addColumnToTableRow(booleanCreateButton, data.headline);

    tablePropertyList.append(tableRow);
};

function fetchResidentialProperties(suburbToFetch, stateToFetch) {

    renderPropertyListTable();

    fetch("https://api.domain.com.au/v1/listings/residential/_search?api_key=key_daead3aa93fcc658fb277dc12fbdb47e",  {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "listingType":"Sale",
            // "propertyTypes":["House", "NewApartments"],
            "propertyTypes":[],
            "minBedrooms":1,
            "minBathrooms":1,
            "minCarspaces":0,
            "locations":[{"state":stateToFetch, "region":"", "area":"", "suburb":suburbToFetch, "postCode":"", "includeSurroundingSuburbs":false}]
            })
    })
    .then(function (response){
    return response.json()
    })
    .then(function (data){
    data.forEach(function(result) {
        // console.log(result.listing);
        renderPropertyListTableRow(result.listing);
    })
    console.log(data);
    })
};

buttonFetchPropertyList.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    fetchResidentialProperties(suburbSelected.value, stateSelected.value);
});