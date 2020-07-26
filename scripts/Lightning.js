function lightningBolt(x1 , y1 , x2 , y2 , thk) {
	this.start = createVector(x1 , y1);
	this.end = createVector(x2 , y2);
	this.branch = random([0, 0, 1, 1]); // Number of branches
	this.thickness = thk;
	this.bolts = new Mpap();
	this.clr = color("white");
}

lightningBolt.prototype.createBolts = function() {

	let tanget = this.end.copy().sub(this.start);
	let len = tanget.mag();

	let posdot = []

	posdot.push(0);
	for (let i=0; i<len / 4;  i++) posdot.push(random());

	posdot.sort(function(a , b){return a - b;});

	let Sway = 80;
	let Jaggedness = 1 / Sway;
	
	let prevPoint = this.start.copy();
	let prevDisplacement = 0;
	for (let i=1; i<posdot.length; i++) {
		let pos = posdot[i];

		let scale = (len * Jaggedness) * (pos - posdot[i - 1]);

		let envelope = (pos > 0.95)? 20 * (1 - pos) : 1;

		let displacement = random(-Sway, Sway);
        displacement -= (displacement - prevDisplacement) * (1 - scale);
        displacement *= envelope;


		//Translates on vector tanget

		let npos = this.start.copy().add( tanget.copy().mult(pos) ).add(displacement);
		this.bolts.set(prevPoint, npos);

		prevPoint = npos.copy();
		prevDisplacement = displacement;
	}
	this.bolts.set(prevPoint, this.end);
};


lightningBolt.prototype.branches = function(num) {

	function norm(arr) {
		let res = [];
		let top = arr.length / 2;
		let P = 1;
		for (let i=0; i<arr.length; i++) {
			let rep = P;
			while (rep--) res.push(arr[i]);
			P += (i < top)?1:-1;
		}

		return random(res);
	}

	for (let i=0; i<num; i++) {
		let v = norm(this.bolts.arr).key;
									  // from     30   to   120	
		let tempv = p5.Vector.fromAngle(random(0.523599 , 2.0944), random(10, 100));
		tempv.add(v);

		let nbolt = new lightningBolt(v.x, v.y, tempv.x, tempv.y, this.thickness);
		nbolt.createBolts();
		nbolt.branches(nbolt.branch);
		this.bolts.set(v, nbolt, 1);
	}
};