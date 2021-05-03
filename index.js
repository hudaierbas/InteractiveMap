var map = document.getElementById("map");
var mapContainer = document.getElementById("map__container");

window.addEventListener("resize", () => {
  setMapContainerToMiddle();
});

//set map to center of screen
const setMapContainerToMiddle = () => {
  let mapWidth = map.clientWidth;
  let mapHeight = map.clientHeight;
  let mapContainerWidth = mapContainer.clientWidth;
  let mapContainerHeight = mapContainer.clientHeight;

  let mapContainerTop = (mapHeight - mapContainerHeight) / 2;
  let mapContainerLeft = (mapWidth - mapContainerWidth) / 2;

  mapContainer.style.top = mapContainerTop + "px";
  mapContainer.style.left = mapContainerLeft + "px";
};

setMapContainerToMiddle();

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
