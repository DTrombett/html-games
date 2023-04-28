import CanvasElement, { Position } from "./CanvasElement";
import Game from "./Game";

export type TextStyle = Partial<{
	font: string;
	align: CanvasTextAlign;
	fill: string;
}>;

/**
 * A text element
 */
class Text extends CanvasElement {
	/**
	 * The text to display
	 */
	text: string;

	/**
	 * The style of the text
	 */
	style: TextStyle;

	/**
	 * @param game - The game
	 * @param text - The text to display
	 * @param style - The style of the text
	 * @param position - The start position of the element
	 */
	constructor(
		game: Game,
		text: string,
		style: TextStyle = {},
		position?: Partial<Position>
	) {
		super(game, position);
		this.text = text;
		this.style = style;
	}
}

export default Text;
