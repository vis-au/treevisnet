class KeyboardComponent {
	currentImage;

	initCurrentImage() {
		// Init the carousel from the hash string if present
		const show_onload = window.location.hash.substring(1);
		const el = document.getElementById(show_onload + "dv");
		if (el) this.currentImage = $(".detail").toArray().indexOf(el);
		return this;
	}

	playFirstImageCommand() {
		this.currentImage = 0;
		this.playCommand();
	}

	playLastImageCommand() {
		this.currentImage = this.lastIndex;
		this.playCommand();
	}

	playPreviousCommand() {
		if (this.currentImage === undefined) return this.playLastImageCommand();

		this.currentImage--;
		if (this.currentImage < 0) return this.playLastImageCommand();

		this.playCommand();
	}

	playNextCommand() {
		if (this.currentImage === undefined)
			return this.playFirstImageCommand();

		this.currentImage++;
		if (this.currentImage > this.lastIndex)
			return this.playFirstImageCommand();

		this.playCommand();
	}

	playCommand() {
		const el = this.images[this.currentImage];
		el.click();
	}

	get lastIndex() {
		return this.images.length - 1;
	}

	get images() {
		return $(".image");
	}

	initShortcuts() {
		const keyboardShortcuts = {
			left: () => this.playPreviousCommand(),
			right: () => this.playNextCommand(),
		};

		Object.keys(keyboardShortcuts).forEach((key) => {
			Mousetrap.bind(key, function (evt) {
				keyboardShortcuts[key]();
				if (evt.preventDefault) evt.preventDefault();
				return false;
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", () =>
	new KeyboardComponent().initCurrentImage().initShortcuts()
);
