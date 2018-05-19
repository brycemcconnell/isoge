export const CANVAS_SIZEX = 1400
export const CANVAS_SIZEY = 800
export const SCALE_FACTOR = 2

export const random = (max, min) => {
	if (min == undefined) min = 0;
	return Math.round(Math.random() * (max - min) + min);
};

export const textStyle = new PIXI.TextStyle({
	fontFamily: 'PixelMPlus10',
	fontSize: 20,
	fill: 0xffffff
})

export const textStyles = {
	"black" : new PIXI.TextStyle({
		fontFamily: 'PixelMPlus10',
		fontSize: 20,
		fill: 0x000000
	}),
	"Title" : new PIXI.TextStyle({
		fontFamily: 'PixelMPlus10',
		fontSize: '96px',
		fill: 0xffffff
	})
};

export const backgroundColor = 0x2aa1cb;