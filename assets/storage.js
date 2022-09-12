//  DOM
var chosenShortList = document.getElementById ("shortList");
var buttonClearShortlist = document.getElementById("button-clear-shortlist");

function clearShortlist(){
  localStorage.clear();
  reload();
};

// store in local storage
function storeShortlistProperty(property) {

  var shortlistProperties = localStorage.getItem('shortlistProperties');

  // console.log("before localstorage is accessed");

  if (shortlistProperties && shortlistProperties != null) {
    var myArr = JSON.parse(shortlistProperties);
    // console.log(myArr);
    myArr.push(property);
    localStorage.setItem('shortlistProperties', myArr);
    // console.log(property);
    localStorage.setItem('shortlistProperties', JSON.stringify(myArr));
    // console.log("local property stored");
  }
  else {
    // console.log("local storage was empty - this is the first item");
    localStorage.setItem('shortlistProperties', JSON.stringify([property]));
  };

  // console.log("need to render new selection");
  reload();
};

//retrieve from local storage
function reload() {
  var shortlistProperties = localStorage.getItem('shortlistProperties');
  var shortlistButtonId = 0;

  $("#shortList").html("");

  // console.log(shortlistProperties);
  // if (shortlistProperties && shortlistProperties != null) {
  if (shortlistProperties != null) {
    const myArr = JSON.parse(shortlistProperties);
    myArr.forEach(element => {
      var shortListItem;
      shortListItem = document.createElement("button");
      shortListItem.textContent = element.listing.propertyDetails.displayableAddress;
      shortListItem.setAttribute("id", "btn-shortlist" + shortlistButtonId);
      chosenShortList.appendChild(shortListItem);
      shortListItem.addEventListener("click", (e)=>{
        btnShortlistClick(e, e.target.id);
      });
      shortlistButtonId++;
    });
  }
}; 

window.addEventListener('load', reload);

buttonClearShortlist.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  clearShortlist();
});