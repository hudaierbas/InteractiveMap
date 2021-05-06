var map = document.getElementById("map");
var mapContainer = document.getElementById("map__container");
var scene = document.getElementById("scene");

//change map size
var increaseRate = mapContainer.clientWidth / mapContainer.clientHeight;

const mapSize = (x) => {
  //map current size
  let mapContainerWidth = mapContainer.clientWidth;
  let mapContainerHeight = mapContainer.clientHeight;

  if (x === "increase") {
    //increase map size
    mapContainer.style.width = mapContainerWidth + 100 * increaseRate + "px";
    mapContainer.style.height = mapContainerHeight + 100 * increaseRate + "px";
  }
  if (x === "decrease") {
    //decrease map size
    mapContainer.style.width = mapContainerWidth - 100 * increaseRate + "px";
    mapContainer.style.height = mapContainerHeight - 100 * increaseRate + "px";
  }
};

scene.onwheel = (event) => {
  if (event.deltaY < 0) {
    //on mouse wheel up
    mapSize("increase");
  } else if (event.deltaY > 0) {
    //on mouse wheel down
    mapSize("decrease");
  }
};

//drag the map
const startDrag = (e) => {
  // determine event object
  if (!e) {
    var e = window.event;
    console.log(e);
  }

  // IE uses srcElement, others use target
  var targ = e.target ? e.target : e.srcElement;

  if (targ.className != "dragme") {
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
};

//move map
const dragDiv = (e) => {
  if (!drag) {
    return;
  }
  if (!e) {
    var e = window.event;
  }
  var targ = e.target ? e.target : e.srcElement;
  // move map
  targ.style.left = coordX + e.clientX - offsetX + "px";
  targ.style.top = coordY + e.clientY - offsetY + "px";
  return false;
};

const stopDrag = () => {
  drag = false;
};

window.onload = () => {
  document.onmousedown = startDrag;
  document.onmouseup = stopDrag;
};

//test data
var testData = {
  1: {
    title: "data1",
    info: "info 1 info 1info 1info 1info 1info 1info 1info 1info 1",
    coordX: "310",
    coordY: "210",
  },
  2: {
    title: "data2",
    info: "info 2 info 2info 2info 2info 2info 2info 2info 2info 2",
    coordX: "200",
    coordY: "300",
  },
  3: {
    title: "data2",
    info: "info 2 info 2info 2info 2info 2info 2info 2info 2info 2",
    coordX: "200",
    coordY: "400",
  },
};

var count = Object.keys(testData).length;

//on hover pin
const pinHover = (pinNo) => {
  console.log(pinNo);
};

//create pins
const createPin = () => {
  for (let index = 1; index < count + 1; index++) {
    const element = testData[`${index}`];

    const pin = document.createElement("img");
    pin.className = "pin";
    pin.src = "./img/pin.png";
    pin.setAttribute("onmouseover", `pinHover(${index})`);
    pin.style.top = (element.coordY / mapContainer.clientHeight) * 100 + "%";
    pin.style.left = (element.coordX / mapContainer.clientWidth) * 100 + "%";

    scene.appendChild(pin);
  }
};

createPin();
