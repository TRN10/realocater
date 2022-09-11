// from script.js
//var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;
var tableRow;
var tableCell;
var tableCellToolTip;
var tableButtonAddToShortList;
// div class=" id=card-action""weatherTable"


// change table data to array
//var tableContent = [tablePropertyListBody, ]


// stringify array


// store in local storage

var tableContent = document.getElementById('card-action');
localStorage.setItem('tableContent', tableContent);
console.log(tableContent)

//retrieve from local storage

if (localStorage.getItem("tableContent") !== null) {
   var tableContent = localStorage.getItem('tableContent').innerHTML;
   document.getElementById('tableContent').innerHTML = tableContent;
   console.log()
};