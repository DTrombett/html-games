import Game from "./Game";

export type Position = {
	x: number;
	y: number;
};

/**
 * A canvas element
 */
class CanvasElement {
	/**
	 * The position of the element
	 */
	pos: Position;

	/**
	 * If the element should be removed
	 */
	dead = false;

	/**
	 * The game that instantiated this
	 */
	game: Game;

	/**
	 * @param game - The game
	 * @param param0 - The start position
	 */
	constructor(game: Game, { x = 0, y = 0 }: Partial<Position> = {}) {
		this.game = game;
		this.pos = { x, y };
	}

	/**
	 * Update the element.
	 * @param dt - The time before last update
	 */
	update(dt: number): void {}
}

export default CanvasElement;
