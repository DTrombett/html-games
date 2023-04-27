/**
 * A texture
 */
class Texture {
	/**
	 * The image to render
	 */
	img: HTMLImageElement;

	/**
	 * @param src - The url of the image
	 */
	constructor(src: string) {
		this.img = new Image();
		this.img.src = src;
	}
}

export default Texture;
