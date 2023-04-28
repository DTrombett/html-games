import CanvasRenderer from "../CanvasRenderer";
import KeyControls from "../controls/KeyControls";
import Baddie from "./Baddie";
import Bullet from "./Bullet";
import Container from "./Container";
import Ship from "./Ship";
import Sprite from "./Sprite";
import Text from "./Text";
import Texture from "./Texture";

class Game {
	/**
	 * The size of the score text
	 */
	static scoreSize = 20;

	/**
	 * The size of the game over text
	 */
	static gameOverSize = 30;

	/**
	 * The size of the game over footer
	 */
	static gameOverFooterSize = 15;

	/**
	 * The renderer
	 */
	renderer: CanvasRenderer;

	/**
	 * Controls for the key
	 */
	keyControls: KeyControls;

	/**
	 * The container for the scene
	 */
	scene: Container;

	/**
	 * The container for the bullets
	 */
	bullets: Container<Bullet>;

	/**
	 * The container for the baddies
	 */
	baddies: Container<Baddie>;

	/**
	 * The ship
	 */
	ship: Ship;

	/**
	 * The text with the score
	 */
	scoreText: Text;

	/**
	 * The game height
	 */
	height: number;

	/**
	 * The game width
	 */
	width: number;

	/**
	 * The game score
	 */
	score = 0;

	/**
	 * If the game is ended
	 */
	gameOver = false;

	/**
	 * The last timestamp of the game callback
	 */
	lastTimestamp = 0;

	/**
	 * The start timestamp of the game
	 */
	startTimestamp = 0;

	/**
	 * The timestamp of the last shot
	 */
	lastShot = 0;

	/**
	 * The timestamp of the last spawn
	 */
	lastSpawn = 0;

	/**
	 * The number of killed baddies
	 */
	killedBaddies = 0;

	/**
	 * The loop function of the game
	 */
	loop?: (timestamp: number) => void;

	/**
	 * @param options - The options for the game
	 */
	constructor(options: { width: number; height: number }) {
		this.width = options.width;
		this.height = options.height;
		this.keyControls = new KeyControls();
		this.renderer = new CanvasRenderer(this);
		this.scene = new Container(this);
		this.bullets = new Container<Bullet>(this);
		this.baddies = new Container<Baddie>(this);
		this.ship = new Ship(this);
		this.scoreText = new Text(
			this,
			`Score: ${this.score} - Baddies killed: ${this.killedBaddies}`,
			{
				font: `${Game.scoreSize}px sans-serif`,
				fill: "#8B8994",
				align: "center",
			},
			{ x: this.width / 2, y: this.height - Game.scoreSize }
		);
	}

	/**
	 * Start the game.
	 * @param loop - The function to update the elements for every render
	 */
	start(loop: NonNullable<this["loop"]>) {
		this.loop = loop;
		this.scene.add(new Sprite(this, new Texture("res/images/bg.png")));
		this.scene.add(this.scoreText);
		this.scene.add(this.baddies);
		this.scene.add(this.bullets);
		this.scene.add(this.ship);
		document.querySelector("#board")!.appendChild(this.renderer.view);
		requestAnimationFrame((t) => this.callback(t));
	}

	/**
	 * Request the game over.
	 * @param timestamp - The current timestamp
	 */
	doGameOver(timestamp: number) {
		this.scene.add(
			new Text(
				this,
				"Game Over",
				{
					font: `${Game.gameOverSize}px sans-serif`,
					fill: "red",
					align: "center",
				},
				{ x: this.width / 2, y: this.height / 2 - Game.gameOverSize }
			)
		);
		this.scene.add(
			new Text(
				this,
				`You lasted ${Math.round(
					(timestamp - this.startTimestamp) / 1_000
				)} seconds`,
				{
					font: `${Game.gameOverFooterSize}px sans-serif`,
					fill: "red",
					align: "center",
				},
				{
					x: this.width / 2,
					y: this.height / 2,
				}
			)
		);
		this.scene.remove(this.ship);
		this.gameOver = true;
	}

	/**
	 * Shoot a bullet.
	 * @param timestamp - The current timestamp
	 */
	shoot(timestamp: number) {
		this.bullets.add(new Bullet(this));
		this.lastShot = timestamp;
	}

	/**
	 * Spawn a baddie.
	 * @param timestamp - The current timestamp
	 */
	spawnBaddie(timestamp: number) {
		this.baddies.add(new Baddie(this));
		this.lastSpawn = timestamp;
	}

	/**
	 * Kill a baddie.
	 * @param timestamp - The current timestamp
	 * @param baddie - The baddie to kill
	 * @param bullet - The bullet to use
	 */
	killBaddie(timestamp: number, baddie: Baddie, bullet: Bullet) {
		baddie.dead = true;
		bullet.dead = true;
		this.killedBaddies++;
		this.score += 10;
	}

	private callback(timestamp: number) {
		requestAnimationFrame((t) => this.callback(t));
		this.startTimestamp ||= timestamp;
		this.loop?.(timestamp);
		this.scoreText.text = `Score: ${Math.round(this.score)} - Baddies killed: ${
			this.killedBaddies
		}`;
		this.scene.update(timestamp - this.lastTimestamp);
		this.renderer.render();
		this.lastTimestamp = timestamp;
	}
}

export default Game;
