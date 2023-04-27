/**
 * The key controls
 */
class KeyControls {
	#keys: Record<string, true | undefined> = {};

	constructor() {
		document.addEventListener("keydown", (e) => {
			this.#keys[e.code] = true;
			if (e.code.startsWith("Arrow")) e.preventDefault();
		});
		document.addEventListener("keyup", (e) => delete this.#keys[e.code]);
	}

	/**
	 * Check if a key is being pressed.
	 * @param key - The key to get
	 * @returns Whether the key is pressed
	 */
	getKey(key: string) {
		return this.#keys[key] ?? false;
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
}

export default KeyControls;
