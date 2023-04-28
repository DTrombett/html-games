import Game from "./elements/Game";

// TODO: Adapt the game to the window size
const game = new Game({
	width: 640,
	height: 320,
	scoreSize: 20,
	gameOverSize: 30,
});

game.start((timestamp) => {
	const dt = timestamp - game.lastTimestamp;
	const elapsed = timestamp - game.startTimestamp;

	if (!game.gameOver) {
		game.score += dt / 1_000;
		if (game.keyControls.action && timestamp - game.lastShot > 100)
			game.shoot(timestamp);
		if (
			elapsed >= 1_000 &&
			timestamp - game.lastSpawn >=
				(10_000_000 / elapsed) * (Math.random() * 0.5 + 0.75)
		)
			game.spawnBaddie(timestamp);
	}
	for (const baddie of game.baddies.children) {
		for (const bullet of game.bullets.children)
			if (
				!bullet.dead &&
				Math.sqrt(
					(baddie.pos.x + 16 - (bullet.pos.x + 8)) ** 2 +
						(baddie.pos.y + 16 - (bullet.pos.y + 8)) ** 2
				) < 24
			) {
				baddie.dead = true;
				bullet.dead = true;
				game.score += dt / 10;
			}
		if (baddie.pos.x < 0) {
			if (!game.gameOver) game.doGameOver();
			baddie.dead = true;
		}
	}
});
