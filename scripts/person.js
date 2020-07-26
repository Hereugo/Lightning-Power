function person(x, y, animation_alive, animation_dead, frame, speed, hat, idhat) {
	this.pos = createVector(x , y);
	
	this.animeA = animation_alive;
	this.animeD = animation_dead;
	this.amountA = this.animeA.length;
	this.amountD = this.animeD.length;
	
	this.hat = hat || -1;
	this.idhat = idhat || -1;

	this.frame = frame;
	this.speed = speed;

	this.head = createVector(this.pos.x + 25, this.pos.y + 8);
	this.headRadius = 10;

	this.finish = random(0, width);

	this.dead = false;


}

person.prototype.show = function() {
	if (floor(this.frame) >= this.amountD && this.dead == true) {
		return -1;
	}

	if (this.dead == true) {
		let index = floor(this.frame) % this.amountD;
		image(this.animeD[index], this.pos.x, this.pos.y);
	} else {
		let index = floor(this.frame) % this.amountA;
		image(this.animeA[index], this.pos.x, this.pos.y);
		if (this.hat != -1) {
			if (this.idhat == 1) image(this.hat, this.pos.x + 2, this.pos.y);
			else if (this.idhat == 2) image(this.hat, this.pos.x+0.5, this.pos.y-6);
			else if (this.idhat == 3) image(this.hat, this.pos.x, this.pos.y-10);
			else if (this.idhat == 4) image(this.hat, this.pos.x, this.pos.y);
			
		}
	}
	return 0;
};

person.prototype.animate = function() {
	if (this.dead != true) {
		this.frame += this.speed;
		if (this.finish < this.pos.x)
			this.pos.x += -this.speed * 5;
		else
			this.pos.x += this.speed * 5;
		this.head = createVector(this.pos.x + 25, this.pos.y + 8);
		if (Math.abs(this.finish - this.pos.x) < 1)
			this.finish = random(0 , width);
	} else {
		this.frame += 0.125;
	}
};