var map = document.getElementById("map");
var mapContainer = document.getElementById("map__container");
var scene = document.getElementById("scene");
var pinHover;

//change map size
var mapHeight = mapContainer.clientHeight;
var mapWidth = mapContainer.clientWidth;
var increaseRate = mapWidth / mapHeight;

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
  createPin();
};

//test data
var testData = {
  1: {
    img:
      "https://www.thephuketnews.com/photo/listing/2017/1512714016_1-org.jpg",
    title: "data1",
    info: "info 1 info 1info 1info 1info 1info 1info 1info 1info 1",
    coordX: "310",
    coordY: "210",
  },
  2: {
    img:
      "https://geographical.co.uk/media/k2/items/cache/8e4e30c8fc08507de1b0b5afc7d32a85_XL.jpg",
    title: "data2",
    info: "info 2 info 2info 2info 2info 2info 2info 2info 2info 2",
    coordX: "200",
    coordY: "300",
  },
  3: {
    img:
      "https://cdn.dsmcdn.com/ty6/product/media/images/20200717/14/4726625/8181265/1/1_org_zoom.jpg",
    title: "data2",
    info: "info 2 info 2info 2info 2info 2info 2info 2info 2info 2",
    coordX: "200",
    coordY: "400",
  },
};

var count = Object.keys(testData).length;

//on hover pin
const hoverPin = (pinNo) => {
  pinHover.style.top =
    (testData[`${pinNo}`].coordY / mapHeight) * 100 + 1.1 + "%";
  pinHover.style.left =
    (testData[`${pinNo}`].coordX / mapWidth) * 100 + 1 + "%";

  //fill pin hover
  const pinHoverImg = document.getElementById("pinHoverImg");
  const pinHoverTitle = document.getElementById("pinHoverTitle");
  const pinHoverText = document.getElementById("pinHoverText");

  pinHoverImg.setAttribute("src", testData[`${pinNo}`].img);
  pinHoverTitle.innerHTML = testData[`${pinNo}`].title;
  pinHoverText.innerHTML = testData[`${pinNo}`].info;
};

//create pins
const createPin = () => {
  for (let index = 1; index < count + 1; index++) {
    const element = testData[`${index}`];

    const pin = document.createElement("img");
    pin.className = "pin";
    pin.src = "./img/pin.png";
    pin.setAttribute("onmouseover", `hoverPin(${index})`);
    pin.style.top = (element.coordY / mapContainer.clientHeight) * 100 + "%";
    pin.style.left = (element.coordX / mapContainer.clientWidth) * 100 + "%";

    scene.appendChild(pin);
  }
  //pin hover container
  const elemPinHover = document.createElement("div");
  elemPinHover.id = "pinHover";
  scene.appendChild(elemPinHover);
  pinHover = document.getElementById("pinHover");

  //pin hover img
  const pinHoverImg = document.createElement("img");
  pinHoverImg.id = "pinHoverImg";
  pinHover.appendChild(pinHoverImg);
  //pin hover title
  const pinHoverTitle = document.createElement("div");
  pinHoverTitle.id = "pinHoverTitle";
  pinHover.appendChild(pinHoverTitle);
  //pin hover text
  const pinHoverText = document.createElement("div");
  pinHoverText.id = "pinHoverText";
  pinHover.appendChild(pinHoverText);
};
