import CanvasElement, { Position } from "./CanvasElement";
import Game from "./Game";
import Texture from "./Texture";

/**
 * A sprite
 */
class Sprite extends CanvasElement {
	/**
	 * The texture for the sprite
	 */
	texture: Texture;

	/**
	 * Whether the sprite should be removed
	 */
	dead = false;

	/**
	 * @param game - The game
	 * @param texture - The texture for the sprite
	 * @param position - The start position of the sprite
	 */
	constructor(game: Game, texture: Texture, position?: Partial<Position>) {
		super(game, position);
		this.texture = texture;
	}
}

export default Sprite;
