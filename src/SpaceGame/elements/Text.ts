import CanvasElement, { Position } from "./CanvasElement";

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
	 * @param text - The text to display
	 * @param style - The style of the text
	 * @param position - The start position of the element
	 */
	constructor(
		text: string,
		style: TextStyle = {},
		position?: Partial<Position>
	) {
		super(position);
		this.text = text;
		this.style = style;
	}
}

export default Text;
