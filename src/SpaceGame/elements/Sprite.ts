import CanvasElement, { Position } from "./CanvasElement";
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
	 * @param texture - The texture for the sprite
	 * @param position - The start position of the sprite
	 */
	constructor(texture: Texture, position?: Partial<Position>) {
		super(position);
		this.texture = texture;
	}
}

export default Sprite;
