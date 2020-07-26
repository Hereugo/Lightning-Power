var b = [];

var people = [];
const MAXPEOPLE = 50;

var ss_alive;
var sd_alive;
var a_alive = [];

var ss_dead;
var sd_dead;
var a_dead = [];

var ss_hats;
var sd_hats;
var s_hats = [];


function preload() {
	sd_alive = loadJSON('Alive/sprintAlive.json');
	ss_alive = loadImage('Alive/sprintAlive.png');

	sd_dead = loadJSON('Death/death.json');
	ss_dead = loadImage('Death/death.png');

	sd_hats = loadJSON('Hats/hats.json');
	ss_hats = loadImage('Hats/hats.png');
}

function cut_sprite_sheet(spritedata, spritesheet) {
	let res = [];
	let frames = spritedata.frames;
	for (let i=0; i<frames.length; i++) {
		let pos = frames[i].position;
		let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		res.push(img);
	}
	return res;
}

function setup() {
	createCanvas(1000, 400).center();

	a_alive = cut_sprite_sheet(sd_alive, ss_alive);
	a_dead = cut_sprite_sheet(sd_dead, ss_dead);
	s_hats = cut_sprite_sheet(sd_hats, ss_hats);

	for (let i=0; i<MAXPEOPLE; i++) people.push(createPerson());
}

function mousePressed() {
	//Creates lightning
	for (let i=0; i<people.length; i++) {
		let person = people[i];
		
		if (person.dead == true) continue;
		let d = dist(person.head.x, person.head.y, mouseX, mouseY);
		if (d <= person.headRadius) {
			let l = max(0 , person.head.x - 100) , r = min(width, person.head.x + 100);
			let a = new lightningBolt(random(l,r), 0, person.head.x, person.head.y, 1, 255);
			a.createBolts();
			a.branches(a.branch);
			b.push([a, 255]);

			people[i].dead = true;
			people[i].frame = 0;
		}
	}

}


function draw() {
	background(51);

	//<===================Lightning=======================>
	for (let i=0; i<b.length; i++) {
		if (b[i][1] > 0) {
			draws(b[i][0].start, b[i][0], b[i][1]);
			b[i][1] -= 22; //Speed of existing
		}
	}
	for (let i=0; i<b.length; i++) {
		if (b[i][1] <= 0) b[i].shift();
	}
	//<===================================================>



	let mem = [];
	for (let i=0; i<people.length; i++) {
		if (people[i].show() == -1) {
			mem.push(i);
		} else {
			people[i].animate();
		}
	}

	for (let i=0; i<mem.length; i++) {
		people.splice(mem[i], 1);
		people.push(createPerson());
	}
}

function draws(v, a, fade) {
	let data = a.bolts.getData(v);
	let array = data.value;
	for (let i=0; i<array.length; i++) {
		let tempclr = a.clr;
		tempclr.setAlpha(fade);

		glowLine(v.x, v.y, array[i].x, array[i].y, a.thickness + 0.2, tempclr);
		glowPoint(v.x, v.y, a.thickness, tempclr);

		draws(array[i] , a, fade);
	}
	let lArr = data.light;
	for (let i=0; i<lArr.length; i++) draws(v, lArr[i], fade);
	return;
}

function createPerson() {

	let nx = 0 , ny = height - a_alive[0].height;
	nx = -a_alive[0].width;
	if (random() > 0.5) nx = width + a_alive[0].width;
	
	let hat, idhat;
	if (random() <= 0.5) {
		idhat = random([0,1,2,3]);
		hat = s_hats[idhat];
	}

	let res = new person(nx, ny, a_alive, a_dead, random([0,1,2]), random(0.1,0.2), hat, idhat+1);
	return res;
}