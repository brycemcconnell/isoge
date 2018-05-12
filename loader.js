import setup from './setup.js';
export function load() {
  PIXI.loader

  .add("ui-move", "assets/ui-move.png")
  .add("ui-move-down", "assets/ui-move-down.png")
  .add("ui-move-active", "assets/ui-move-active.png")
  .add("ui-build", "assets/ui-build.png")
  .add("ui-build-down", "assets/ui-build-down.png")
  .add("ui-build-active", "assets/ui-build-active.png")
  .add("ui-destroy", "assets/ui-destroy.png")
  .add("ui-destroy-down", "assets/ui-destroy-down.png")
  .add("ui-destroy-active", "assets/ui-destroy-active.png")

  .add("ui-btn-up", "assets/ui-btn-up.png")
  .add("ui-btn-down", "assets/ui-btn-down.png")
  .add("ui-icon-default", "assets/ui-icon-default.png")

  .add("floor-grass", "assets/floor-grass.png")
  .add("floor-grass-rock1", "assets/floor-grass-rock1.png")
  .add("floor-grass-rock2", "assets/floor-grass-rock2.png")
  .add("floor-grass-rock3", "assets/floor-grass-rock3.png")
  .add("floor-grass-dirt1", "assets/floor-grass-dirt1.png")
  .add("floor-grass-dirt2", "assets/floor-grass-dirt2.png")
  .add("floor-grass-dirt3", "assets/floor-grass-dirt3.png")
  .add("floor-wood", "assets/floor-wood.png")
  .add("floor-stone", "assets/floor-stone.png")
  .add("elevated-floor-wood", "assets/elevated-floor-wood.png")
  .add("wall", "assets/wall.png")
  .add("wall-x", "assets/wall-x.png")
  .add("wall-y", "assets/wall-y.png")
  .add("edge-wall-x", "assets/edge-wall-x.png")
  .add("edge-wall-y", "assets/edge-wall-y.png")
  .add("edge-wall-x-inner", "assets/edge-wall-x-inner.png")
  .add("edge-wall-y-inner", "assets/edge-wall-y-inner.png")

  .add("glow-white", "assets/glow-white.png")
  .add("glow-white-west", "assets/glow-white-west.png")
  .add("glow-white-northWest", "assets/glow-white-northWest.png")
  .add("glow-white-east", "assets/glow-white-east.png")
  .add("glow-white-northEast", "assets/glow-white-northEast.png")
  .add("glow-white-southEast", "assets/glow-white-southEast.png")
  .add("glow-white-fill", "assets/glow-white-fill.png")

  .on("progress", loadProgressHandler)
  .load(setup)
}

function loadProgressHandler(loader, resource) {
	loaderInfo.innerHTML = "loading: " + resource.url + ", " + parseFloat(loader.progress).toFixed(2) + "%";
	loaderBar.style.width = loader.progress + "%";
}