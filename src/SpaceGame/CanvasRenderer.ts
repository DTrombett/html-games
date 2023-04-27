import Container from "./elements/Container";
import Sprite from "./elements/Sprite";
import Text from "./elements/Text";

/**
 * The renderer
 */
class CanvasRenderer {
	/**
	 * The canvas element
	 */
	view: HTMLCanvasElement;

	/**
	 * The canvas context
	 */
	ctx: CanvasRenderingContext2D;

	/**
	 * @param param0 - The game size
	 */
	constructor({
		gameHeight,
		gameWidth,
	}: {
		gameWidth: number;
		gameHeight: number;
	}) {
		this.view = document.createElement("canvas");
		this.view.width = gameWidth;
		this.view.height = gameHeight;
		this.ctx = this.view.getContext("2d")!;
	}

	/**
	 * Render a container.
	 * @param container - The container to render
	 */
	render(container: Container) {
		this.ctx.clearRect(0, 0, this.view.width, this.view.width);
		for (const child of container.children) {
			this.ctx.save(); // save context options to the default
			if (child instanceof Text) {
				const { font, fill, align } = child.style;

				if (font) this.ctx.font = font;
				if (fill) this.ctx.fillStyle = fill;
				if (align) this.ctx.textAlign = align;
				this.ctx.fillText(child.text, child.pos.x, child.pos.y);
			} else if (child instanceof Sprite)
				this.ctx.drawImage(child.texture.img, child.pos.x, child.pos.y);
			else if (child instanceof Container) this.render(child);
			this.ctx.restore(); // restore to default options to not affect the others children of the container
		}
	}
}

export default CanvasRenderer;
