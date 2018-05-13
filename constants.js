export const CANVAS_SIZEX = 480 * 2
export const CANVAS_SIZEY = 320 * 2
export const SCALE_FACTOR = 2

export const random = (max, min) => {
	if (min == undefined) min = 0;
	return Math.round(Math.random() * (max - min) + min);
};

export const textStyle = new PIXI.TextStyle({
	fontFamily: 'PixelMPlus10',
	fontSize: 20,
	fill: 0x222222
})