import CanvasElement from "./CanvasElement";

/**
 * A container for other elements
 */
class Container<T extends CanvasElement = CanvasElement> extends CanvasElement {
	/**
	 * The container children
	 */
	children: T[] = [];

	/**
	 * Add an element.
	 * @param child - The child to add
	 * @param append - Whether the child should be added at the start of the array
	 */
	add(child: T, append = false) {
		if (append) this.children.unshift(child);
		else this.children.push(child);
	}

	/**
	 * Remove an element.
	 * @param child - The child to remove
	 */
	remove(child: T) {
		this.children = this.children.filter((c) => c !== child);
	}

	update(dt: number) {
		this.children = this.children.filter((child) => {
			child.update(dt);
			return !child.dead;
		});
	}
}

export default Container;
