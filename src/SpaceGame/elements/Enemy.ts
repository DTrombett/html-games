import Game from "./Game";
import Sprite from "./Sprite";
import Texture from "./Texture";

/**
 * A enemy
 */
class Enemy extends Sprite {
	/**
	 * The texture for the sprite
	 */
	static texture = new Texture("res/images/enemy.png");

	/**
	 * The speed of the element in px/s
	 */
	speed = Math.random() * 150 + 50;

	/**
	 * @param game - The game
	 */
	constructor(game: Game) {
		super(game, Enemy.texture, {
			x: game.width,
			y: Math.random() * (game.height - 32),
		});
	}

	update(dt: number) {
		this.pos.x += (-this.speed * dt) / 1_000;
	}
}

export default Enemy;
