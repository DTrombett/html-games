import Container from "./elements/Container";
import Game from "./elements/Game";
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
	 * The game that instantiated this
	 */
	game: Game;

	/**
	 * @param game - The game
	 */
	constructor(game: Game) {
		this.game = game;
		this.view = document.createElement("canvas");
		this.view.width = game.width;
		this.view.height = game.height;
		this.ctx = this.view.getContext("2d")!;
	}

	/**
	 * Render the game.
	 */
	render() {
		this.ctx.clearRect(0, 0, this.view.width, this.view.width);
		this.renderContainer(this.game.scene);
	}

	private renderContainer(container: Container) {
		for (const child of container.children) {
			this.ctx.save();
			if (child instanceof Text) {
				const { font, fill, align } = child.style;

				if (font) this.ctx.font = font;
				if (fill) this.ctx.fillStyle = fill;
				if (align) this.ctx.textAlign = align;
				this.ctx.fillText(
					child.text,
					Math.round(child.pos.x),
					Math.round(child.pos.y)
				);
			} else if (child instanceof Sprite)
				this.ctx.drawImage(
					child.texture.img,
					Math.round(child.pos.x),
					Math.round(child.pos.y)
				);
			else if (child instanceof Container) this.renderContainer(child);
			this.ctx.restore();
		}
	}
}

export default CanvasRenderer;
