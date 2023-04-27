import Sprite from "./Sprite";
import Texture from "./Texture";

/**
 * A bad guy
 */
class Baddie extends Sprite {
	/**
	 * The texture for the sprite
	 */
	static texture = new Texture("res/images/baddie.png");

	/**
	 * The speed of the element in px/s
	 */
	speed: number;

	/**
	 * @param speed - The speed of the element in px/s
	 * @param gameSize - The game size
	 */
	constructor(
		speed: number,
		gameSize: {
			gameWidth: number;
			gameHeight: number;
		}
	) {
		super(Baddie.texture, {
			x: gameSize.gameWidth,
			y: Math.random() * (gameSize.gameHeight - 32),
		});
		this.speed = speed;
	}

	update(dt: number) {
		this.pos.x += Math.floor((-this.speed * dt) / 1_000);
	}
}

export default Baddie;
