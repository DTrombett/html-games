import { Position } from "./CanvasElement";
import Sprite from "./Sprite";
import Texture from "./Texture";

/**
 * A bullet to kill the bad guys
 */
class Bullet extends Sprite {
	/**
	 * The texture for the sprite
	 */
	static texture = new Texture("res/images/bullet.png");

	/**
	 * The game width
	 */
	gameWidth: number;

	/**
	 * @param gameWidth - The game width
	 * @param position - The start position
	 */
	constructor(gameWidth: number, position?: Partial<Position>) {
		super(Bullet.texture, position);
		this.gameWidth = gameWidth;
	}

	update(dt: number) {
		this.pos.x += (4 * dt) / 10;
		this.dead ||= this.pos.x >= this.gameWidth + 20;
	}
}

export default Bullet;
