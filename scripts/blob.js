function Blob(x, y, r, colour) {
	this.pos = createVector(x, y);
	this.r = r;
	this.update = function () {
		/* updates the place of the bubble every frame */
		// let vel; // velocity
		// let wallReached = { // determines the borders for the bubble
		// 	right: this.pos.x >= width * 2 - this.r * 0.7, // right border
		// 	left: this.pos.x <= -width + this.r * 0.7, // left border...
		// 	top: this.pos.y >= height * 2 - this.r * 0.7,
		// 	bot: this.pos.y <= -height + this.r * 0.7
		// };
		// let widthRestricted = wallReached.right || wallReached.left;
		// let heightRestricted = wallReached.top || wallReached.bot;
		// if (widthRestricted || heightRestricted) {
		// 	if (widthRestricted) {
		// 		vel = createVector(validDir(wallReached.left, wallReached.right, "vertical"), mouseY - height / 2);
		// 	}
		// 	if (heightRestricted) {
		// 		vel = createVector(mouseX - width / 2, validDir(wallReached.bot, wallReached.top, "horizontal"));
		// 	}
		// } else {
		// 	vel = createVector(mouseX - width / 2, mouseY - height / 2);
		// };
		vel = createVector(mouseX - width / 2, mouseY - height / 2);
		
		vel.setMag(5);
		this.pos.add(vel);
	}
	this.show = function () {
		/* makes the bubble appear */
		fill(colour);
		ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
	this.tour = function () {
		/* makes the bubble stay centered and the background move instead */
		translate(width / 2 - this.pos.x, height / 2 - this.pos.y);
	}
	this.eats = function (other) {
		let d = p5.Vector.dist(this.pos, other.pos);
		if (d < this.r + (other.r / 2)) {
			this.r += other.r;
			this.show();
			return true;
		} else {
			return false;
		}
	}
}
	validDir = function (restriction1, restriction2, restrictionType) {
		/**
		 * validDir - function that checks if the bubble doesn't get out of the it's placep5.BandPass()
		 *
		 * @restriction1: border, can be top, bottom, right or left border.
		 * @restriction2: border, can be top, bottom, right or left border.
		 * @restrictionType: if vertical means that the bubble reached the max top / bottom.
		 *
		 * Return: it returns a value which can determine whether the bubble can keep going the same direction or not.
		 */
		if (restrictionType == "vertical") {
			// reached the right or the left border
			mouseDir = mouseX;
			windowDimension = windowWidth;
			center = width / 2;
		} else if (restrictionType == "horizontal") {
			// reached the top or the bottom border
			mouseDir = mouseY;
			windowDimension = windowHeight;
			center = height / 2;
		}
		if (restriction1 && mouseDir < windowDimension / 2) {
			// restriction1 can be left or top border reached
			// if top border is reached and the mouse is still
			// in the upper-half of the screen (bubble is moving up)
			// it returns 0 => no more going up
			return 0;
		} else if (restriction2 && mouseDir > windowDimension / 2) {
			// restriction1 can be right or bottom border reached
			// if right border is reached and the mouse is still
			// in the right-half of the screen (bubble is moving to the right)
			// it returns 0 => no more going to the right
			return 0;
		} else {
			// normal state
			return mouseDir - center;
		}
	}