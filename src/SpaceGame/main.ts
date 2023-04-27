// Import libraries
import CanvasRenderer from "./CanvasRenderer";
import KeyControls from "./controls/KeyControls";
import Baddie from "./elements/Baddie";
import Bullet from "./elements/Bullet";
import Container from "./elements/Container";
import Ship from "./elements/Ship";
import Sprite from "./elements/Sprite";
import Text from "./elements/Text";
import Texture from "./elements/Texture";

// TODO: Create a Game class
// TODO: Adapt the game to the window size

const gameWidth = 640;
const gameHeight = 320;
const scoreSize = 20;
const gameOverSize = 30;
const renderer = new CanvasRenderer({
	gameHeight,
	gameWidth,
});
const keyControls = new KeyControls();
const scene = new Container();
const bullets = new Container<Bullet>();
const baddies = new Container<Baddie>();
const ship = new Ship({ gameWidth, gameHeight }, keyControls);
const scoreText = new Text(
	"Score: 0",
	{
		font: `${scoreSize}px sans-serif`,
		fill: "#8B8994",
		align: "center",
	},
	{ x: gameWidth / 2, y: gameHeight - scoreSize }
);
let gameOver = false;
let last = 0;
let lastShot = 0;
let lastSpawn = 0;
let score = 0;
let startTimestamp: number;
const loop = (timestamp: number) => {
	requestAnimationFrame(loop);
	startTimestamp ??= timestamp;
	const dt = timestamp - last;
	const elapsed = timestamp - startTimestamp;

	last = timestamp;
	if (!gameOver) {
		score += dt / 1_000;
		if (keyControls.action && timestamp - lastShot > 100) {
			bullets.add(
				new Bullet(gameWidth, { x: ship.pos.x + 16, y: ship.pos.y + 16 })
			);
			lastShot = timestamp;
		}
		if (
			elapsed >= 1_000 &&
			timestamp - lastSpawn >=
				(7_500_000 / elapsed) * (Math.random() * 0.5 + 0.75)
		) {
			baddies.add(
				new Baddie(Math.random() * 100 + 100, { gameWidth, gameHeight })
			);
			lastSpawn = timestamp;
		}
	}
	for (const baddie of baddies.children) {
		for (const bullet of bullets.children)
			if (
				!bullet.dead &&
				Math.sqrt(
					(baddie.pos.x + 16 - (bullet.pos.x + 8)) ** 2 +
						(baddie.pos.y + 16 - (bullet.pos.y + 8)) ** 2
				) < 24
			) {
				baddie.dead = true;
				bullet.dead = true;
				score += dt / 10;
			}
		if (baddie.pos.x < 0) {
			if (!gameOver) {
				scene.add(
					new Text(
						"Game Over",
						{
							font: `${gameOverSize}px sans-serif`,
							fill: "red",
							align: "center",
						},
						{ x: gameWidth / 2, y: gameHeight / 2 - gameOverSize }
					)
				);
				scene.remove(ship);
				gameOver = true;
			}
			baddie.dead = true;
		}
	}
	scoreText.text = `Score: ${Math.floor(score)}`;
	scene.update(dt);
	renderer.render(scene);
};

scene.add(new Sprite(new Texture("res/images/bg.png")));
scene.add(scoreText);
scene.add(baddies);
scene.add(bullets);
scene.add(ship);
document.querySelector("#board")!.appendChild(renderer.view);
requestAnimationFrame(loop);
