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
//var shortlistProperties = [tablePropertyListBody, ]


// stringify array


// store in local storage
function test(property){
 //  var shortlistProperties = document.getElementById('data-row' + rowNumber).textContent;
 //  var shortlistProperties = document.getElementById('tbody');
 var shortlistProperties = localStorage.getItem('shortlistProperties');

 console.log("before localstorage is accessed");

 if(shortlistProperties && shortlistProperties != null){
    var myArr = JSON.parse(shortlistProperties);
    // console.log(myArr);
    myArr.push(property);
      localStorage.setItem('shortlistProperties', myArr);
      console.log(property);
      
    localStorage.setItem('shortlistProperties', JSON.stringify(myArr));
    console.log("local property stored");
  }
  else{
    console.log("local storage was empty - this is the first item");
   localStorage.setItem('shortlistProperties', JSON.stringify([property]));
 }

 console.log("need to render new selection");
 reload();
};



//retrieve from local storage

function reload(){
var shortlistProperties = localStorage.getItem('shortlistProperties');

$("#shortList").html("");

console.log(shortlistProperties);
if ( shortlistProperties && shortlistProperties != null) {
const myArr = JSON.parse(shortlistProperties);
myArr.forEach(element => {
  var shortListItem;
shortListItem = document.createElement("button");
shortListItem.textContent = element.listing.propertyDetails.displayableAddress;
chosenShortList.appendChild(shortListItem);
});
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