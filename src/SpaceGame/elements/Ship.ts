import KeyControls from "../controls/KeyControls";
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
	 * The game size
	 */
	gameSize: { gameWidth: number; gameHeight: number };

	/**
	 * Th key controls of the game
	 */
	keyControls: KeyControls;

	/**
	 *
	 * @param gameWidth - The game wi
	 * @param gameHeight
	 * @param keyControls
	 */
	constructor(
		gameSize: { gameWidth: number; gameHeight: number },
		keyControls: KeyControls
	) {
		super(Ship.texture, {
			x: gameSize.gameWidth / 8 - 16,
			y: gameSize.gameHeight / 2 - 16,
		});
		this.gameSize = gameSize;
		this.keyControls = keyControls;
	}

	update(dt: number) {
		this.pos.x += (this.keyControls.x * dt) / 5;
		this.pos.y += (this.keyControls.y * dt) / 5;
		if (this.pos.x < 0) this.pos.x = 0;
		if (this.pos.x > this.gameSize.gameWidth - 32)
			this.pos.x = this.gameSize.gameWidth - 32;
		if (this.pos.y < 0) this.pos.y = 0;
		if (this.pos.y > this.gameSize.gameHeight - 32)
			this.pos.y = this.gameSize.gameHeight - 32;
	}
}

export default Ship;
