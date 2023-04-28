import Game from "./Game";
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
	speed = Math.random() * 100 + 100;

	/**
	 * @param game - The game
	 */
	constructor(game: Game) {
		super(game, Baddie.texture, {
			x: game.width,
			y: Math.random() * (game.height - 32),
		});
	}

	update(dt: number) {
		this.pos.x += Math.round((-this.speed * dt) / 1_000);
	}
}

export default Baddie;
