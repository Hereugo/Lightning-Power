function glowPoint(x, y, thickness, clr) {
	let tempclr = color(clr);

	stroke(tempclr);
	strokeWeight(thickness+0.01);
	point(x, y);

	let s = tempclr.toString();
	let alpha = parseFloat(s.substring(17, s.length-1));

	let spread = alpha * 100;

	while (spread >= 0) {
		thickness += 2;

		tempclr.setAlpha(spread);
        stroke(tempclr);
		strokeWeight(thickness);
		
		point(x, y);
        
        spread -= 25;
	}
}

function glowLine(x1, y1, x2, y2, thickness, clr) {
	stroke(clr);
	strokeWeight(thickness);
	line(x1, y1, x2, y2);
}
