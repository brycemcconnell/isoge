import setup from './setup.js';
export function load() {
  PIXI.loader

  .add("bg-grass", "assets/bg-grass.png")

  .add("ui-move", "assets/ui-move.png")
  .add("ui-move-active", "assets/ui-move-active.png")
  .add("ui-build", "assets/ui-build.png")
  .add("ui-build-active", "assets/ui-build-active.png")
  .add("ui-destroy", "assets/ui-destroy.png")
  .add("ui-destroy-active", "assets/ui-destroy-active.png")
  .add("ui-harvest", "assets/ui-harvest.png")
  .add("ui-harvest-active", "assets/ui-harvest-active.png")  
  .add("ui-plow", "assets/ui-plow.png")
  .add("ui-plow-active", "assets/ui-plow-active.png")
  .add("ui-seed", "assets/ui-seed.png")
  .add("ui-seed-active", "assets/ui-seed-active.png")
  .add("ui-inventory", "assets/ui-inventory.png")
  .add("ui-inventory-active", "assets/ui-inventory-active.png")


  .add("ui-close", "assets/ui-close.png")
  .add("ui-window-corner", "assets/ui-window-corner.png")
  .add("ui-window-top", "assets/ui-window-topleft.png")
  .add("ui-window-left", "assets/ui-window-topleft.png")
  .add("ui-window-bottom", "assets/ui-window-bottomright.png")
  .add("ui-window-right", "assets/ui-window-bottomright.png")

  .add("coin", "assets/coin.png")

  .add("ui-btn-up", "assets/ui-btn-up.png")
  .add("ui-btn-down", "assets/ui-btn-down.png")
  .add("ui-icon-default", "assets/ui-icon-default.png")

  .add("bush01", "assets/bush01.png")
  .add("berry-bush01", "assets/berry-bush01.png")
  .add("tree00", "assets/tree00.png")
  .add("tree01", "assets/tree01.png")
  .add("tree02", "assets/tree02.png")

  .add("floor-grass", "assets/floor-grass.png")
  .add("floor-water", "assets/floor-water.json")
  .add("floor-dirt", "assets/floor-dirt.png")
  .add("floor-plowed", "assets/floor-plowed.png")

  .add("farm-seeds00", "assets/farm-seeds00.png")
  .add("farm-seeds01", "assets/farm-seeds01.png")
  .add("farm-seeds02", "assets/farm-seeds02.png")
  .add("farm-seeds03", "assets/farm-seeds03.png")
  .add("farm-seeds04", "assets/farm-seeds04.png")
  .add("farm-seeds05", "assets/farm-seeds05.png")
  .add("farm-seeds06", "assets/farm-seeds06.png")

  .add("floor-grass-rock1", "assets/floor-grass-rock1.png")
  .add("floor-grass-rock2", "assets/floor-grass-rock2.png")
  .add("floor-grass-rock3", "assets/floor-grass-rock3.png")
  .add("floor-grass-dirt1", "assets/floor-grass-dirt1.png")
  .add("floor-grass-dirt2", "assets/floor-grass-dirt2.png")
  .add("floor-grass-dirt3", "assets/floor-grass-dirt3.png")
  .add("floor-wood", "assets/floor-wood.png")
  .add("floor-stone", "assets/floor-stone.png")
  .add("elevated-floor-wood", "assets/elevated-floor-wood.png")
  .add("wall-x", "assets/wall-x.png")

  .add("glow-white", "assets/glow-white.png")
  .add("glow-white-fill", "assets/glow-white-fill.png")

  .on("progress", loadProgressHandler)
  .load(setup)
}

function loadProgressHandler(loader, resource) {
	document.getElementById('loaderInfo').innerHTML = "loading: " + resource.url + ", " + parseFloat(loader.progress).toFixed(2) + "%";
	document.getElementById('loaderBar').style.width = loader.progress + "%";
}