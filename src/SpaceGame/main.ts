import Game from "./elements/Game";

const game = new Game({
	width: 640,
	height: 320,
});

game.start((timestamp) => {
	if (!game.gameOver) {
		const elapsed = timestamp - game.startTimestamp;

		game.score += (timestamp - game.lastTimestamp) / 1_000;
		if (game.keyControls.action && timestamp - game.lastShot > 100)
			game.shoot(timestamp);
		if (
			elapsed >= 1_000 &&
			timestamp - game.lastSpawn >=
				(10_000_000 / elapsed) * (Math.random() * 0.5 + 0.75)
		)
			game.spawnEnemy(timestamp);
	}
	for (const enemy of game.enemies.children) {
		for (const bullet of game.bullets.children)
			if (
				!bullet.dead &&
				Math.sqrt(
					(enemy.pos.x + 16 - (bullet.pos.x + 8)) ** 2 +
						(enemy.pos.y + 16 - (bullet.pos.y + 8)) ** 2
				) < 24
			)
				game.killEnemy(enemy, bullet);
		if (enemy.pos.x < 0) {
			if (!game.gameOver) game.doGameOver(timestamp);
			enemy.dead = true;
		}
	}
});
