// from script.js
//var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;
var tableRow;
var tableCell;
var tableCellToolTip;
var tableButtonAddToShortList;
// div class= id=card-actionweatherTable


// change table data to array
//var tableContent = [tablePropertyListBody, ]


// stringify array


// store in local storage
function test(rowNumber){
   var tableContent = document.getElementById('data-row' + rowNumber).textContent;
 //  var tableContent = document.getElementById('tbody');
   localStorage.setItem('tableContent', tableContent);
   console.log(tableContent);
   
localStorage.setItem('tableContent', JSON.stringify(tableContent));
};



//retrieve from local storage

function reload(){
//if (localStorage.getItem(tableContent) !== null) {
var tableContent = localStorage.getItem('tableContent');
const myArr = JSON.parse(tableContent);
//document.getElementById('tableContent').innerHTML = tableContent;
console.log('reload');
}; 

//reload()
// function test (propertyLatitude, propertyLongitude, propertyAddress, propertyType, propertyPrice, propertyRealEstateAgent) {
 
//    var latitude;
//    var longitude;
//    var address;
//    var type;
//    var price;
//    var realEstateAgent;
   
//    var storing = JSON.parse(window.localStorage.getItem('storing')) || [];   
//    var property = {
//       lat: propertyLatitude, 
//       long: propertyLongitude,
//       addr: propertyAddress,
//       type: propertyType,
//       prc: propertyPrice,
//       rea: propertyRealEstateAgent
//          };
         
         
//       //   var index = 0;
//       //   while (index < 1) {
//       //      storing[index].addr = propertyaddr;
//       //      index++;
//       //   };
//        storing.push(property);
//          window.localStorage.setItem(storing, JSON.stringify(storing));      



 


//  //  newfunction();
// };



 // var btnLocation0 = document.getElementById (#btn-location0)
 //var input = document.getElementById(input3).value;
 //localStorage.setItem(dailyactivity3, input);
 //btnLocation0.onclick = () => {
 //console.log(test button);
 //};