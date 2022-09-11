// from script.js
//var tablePropertyList;
var tablePropertyListHead;
var tablePropertyListBody;
var tableRow;
var tableCell;
var tableCellToolTip;
var tableButtonAddToShortList;
var chosenShortList = document.getElementById ("shortList");
// div class= id=card-actionweatherTable


// change table data to array
//var tableContent = [tablePropertyListBody, ]


// stringify array


// store in local storage
function test(property){
 //  var tableContent = document.getElementById('data-row' + rowNumber).textContent;
 //  var tableContent = document.getElementById('tbody');
 var tableContent = localStorage.getItem('tableContent');
 if(tableContent && tableContent != null){
    var myArr = JSON.parse(tableContent);
    // console.log(myArr);
    myArr.push(property);
      localStorage.setItem('tableContent', myArr);
      console.log(property);
      
    localStorage.setItem('tableContent', JSON.stringify(myArr));
  }
  else{
   localStorage.setItem('tableContent', JSON.stringify([property]));
 }
};



//retrieve from local storage

function reload(){
var tableContent = localStorage.getItem('tableContent');
console.log(tableContent);
if ( tableContent && tableContent != null) {
const myArr = JSON.parse(tableContent);
myArr.forEach(element => {
  var shortListItem;
shortListItem = document.createElement("button");
shortListItem.textContent = element.listing.propertyDetails.displayableAddress;
chosenShortList.appendChild(shortListItem);
});
//document.getElementById('tableContent').innerHTML = tableContent;
// console.log(myArr[0]);
// var shortListItem;
// shortListItem = document.createElement("button");
// shortListItem.textContent = myArr.listing.propertyDetails.displayableAddress;
// chosenShortList.appendChild(shortListItem);
//chosenShortList.innerHTML = "<button>" + myArr[0].listing.propertyDetails.displayableAddress + "</button>";
}
}; 

window.addEventListener('load', reload);








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