import Game from "./Game";
import Sprite from "./Sprite";
import Texture from "./Texture";

/**
 * The ship
 */
class Ship extends Sprite {
	/**
	 * The texture for the sprite
	 */
	static texture = new Texture("res/images/spaceship.png");

	/**
	 * @param game - The game
	 */
	constructor(game: Game) {
		super(game, Ship.texture, {
			x: game.width / 8 - 16,
			y: game.height / 2 - 16,
		});
	}

	update(dt: number) {
		const multiplier = (dt * (this.game.height - 32)) / 1_500;

		this.pos.x += this.game.keyControls.x * multiplier;
		this.pos.y += this.game.keyControls.y * multiplier;
		if (this.pos.x < 0) this.pos.x = 0;
		if (this.pos.x > this.game.width - 32) this.pos.x = this.game.width - 32;
		if (this.pos.y < 0) this.pos.y = 0;
		if (this.pos.y > this.game.height - 32) this.pos.y = this.game.height - 32;
	}
}

export default Ship;
