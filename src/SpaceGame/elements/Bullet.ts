import Game from "./Game";
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
	 * @param game - The game
	 */
	constructor(game: Game) {
		super(game, Bullet.texture, {
			x: game.ship.pos.x + 8,
			y: game.ship.pos.y + 8,
		});
	}

	update(dt: number) {
		this.pos.x += (4 * dt) / 10;
		this.dead ||= this.pos.x >= this.game.width + 20;
	}
}

export default Bullet;
