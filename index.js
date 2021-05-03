var map = document.getElementById("map");
var mapContainer = document.getElementById("map__container");

var mapContainerX;
var mapContainerY;
var mouseX;
var mouseY;

// window.addEventListener("resize", () => {
//   setMapContainerToMiddle();
// });

// //set map to center of screen
// const setMapContainerToMiddle = () => {
//   let mapWidth = map.clientWidth;
//   let mapHeight = map.clientHeight;
//   let mapContainerWidth = mapContainer.clientWidth;
//   let mapContainerHeight = mapContainer.clientHeight;

//   let mapContainerTop = (mapHeight - mapContainerHeight) / 2;
//   let mapContainerLeft = (mapWidth - mapContainerWidth) / 2;

//   mapContainer.style.top = mapContainerTop + "px";
//   mapContainer.style.left = mapContainerLeft + "px";
// };

// setMapContainerToMiddle();

//change map size
const mapSize = (e) => {
  let mapContainerWidth = mapContainer.clientWidth;
  let mapContainerHeight = mapContainer.clientHeight;

  if (e === "increase") {
    mapContainer.style.width = mapContainerWidth + 100 + "px";
    mapContainer.style.height = mapContainerHeight + 100 + "px";
  }
  if (e === "decrease") {
    mapContainer.style.width = mapContainerWidth - 100 + "px";
    mapContainer.style.height = mapContainerHeight - 100 + "px";
  }
  setMapContainerToMiddle();
};

mapContainer.addEventListener("wheel", (event) => {
  if (event.deltaY < 0) {
    mapSize("increase");
  } else if (event.deltaY > 0) {
    mapSize("decrease");
  }
});

//drag the map
function startDrag(e) {
  // determine event object
  if (!e) {
    var e = window.event;
    console.log(e);
  }

  // IE uses srcElement, others use target
  var targ = e.target ? e.target : e.srcElement;

  if (targ.className != "map__container") {
    return;
  }
  // calculate event X, Y coordinates
  offsetX = e.clientX;
  offsetY = e.clientY;

  // assign default values for top and left properties
  if (!targ.style.left) {
    targ.style.left = "0px";
  }
  if (!targ.style.top) {
    targ.style.top = "0px";
  }

  // calculate integer values for top and left
  // properties
  coordX = parseInt(targ.style.left);
  coordY = parseInt(targ.style.top);
  drag = true;

  // move div element
  document.onmousemove = dragDiv;

  return false;
}

function dragDiv(e) {
  if (!drag) {
    return;
  }
  if (!e) {
    var e = window.event;
  }
  var targ = e.target ? e.target : e.srcElement;
  // move div element
  targ.style.left = coordX + e.clientX - offsetX + "px";
  targ.style.top = coordY + e.clientY - offsetY + "px";
  return false;
}

function stopDrag() {
  drag = false;
}

window.onload = function () {
  document.onmousedown = startDrag;
  document.onmouseup = stopDrag;
};
