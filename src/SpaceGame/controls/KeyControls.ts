/**
 * The key controls
 */
class KeyControls {
	#keys = new Set<string>();

	constructor() {
		document.body.addEventListener("keydown", (e) => {
			this.#keys.add(e.code);
			if (e.code.startsWith("Arrow")) e.preventDefault();
		});
		document.body.addEventListener("keyup", (e) => this.#keys.delete(e.code));
	}

	/**
	 * Whether the main action is active
	 */
	get action() {
		return this.getKey("Space") || this.getKey("Enter");
	}

	/**
	 * Positive if moving to right, negative otherwise.
	 * Zero if no relevant key is being pressed
	 */
	get x() {
		if (this.getKey("ArrowRight") || this.getKey("KeyD")) return 1;
		if (this.getKey("ArrowLeft") || this.getKey("KeyA")) return -1;
		return 0;
	}

	/**
	 * Positive if moving down, negative otherwise.
	 * Zero if no relevant key is being pressed
	 */
	get y() {
		if (this.getKey("ArrowDown") || this.getKey("KeyS")) return 1;
		if (this.getKey("ArrowUp") || this.getKey("KeyW")) return -1;
		return 0;
	}

	/**
	 * Check if a key is being pressed.
	 * @param key - The key to get
	 * @returns Whether the key is pressed
	 */
	getKey(key: string) {
		return this.#keys.has(key);
	}
}

export default KeyControls;
