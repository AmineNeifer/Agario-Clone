let blob;
let blobs = [];

function setup() {
	createCanvas(windowWidth, windowHeight - 5);
	blob = new Blob(0, 0, 40, 'red');

	for (let i = 0; i < 200; i++) {
		blobs[i] = new Blob(random(-width, width), random(-height, height), 30, "green");
	}
}

function draw() {
	background(220);
	blob.tour();
	// translate(width/2-blob.pos.x, height/2-blob.pos.y);
	// push();
	// fill(0);
	// rect(-width, -height, width * 3, height * 3, 20);
	// pop();
	blob.show();
	blob.update();
	for (let i = blobs.length - 1; i >= 0; i--) {
		blobs[i].show();
		if (blob.eats(blobs[i])) {
			blobs.splice(i, 1);
			blobs.push(new Blob(random(-width, width), random(-height, height), 30, "green"));
		}

	}
	fill(220)

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight - 5);
}