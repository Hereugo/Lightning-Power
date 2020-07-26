function Mpap() {
	this.arr = [];
}


Mpap.prototype.set = function(x , y , z) {
	z = z || 0;
	let val = this.getId(x);
	if (val == -1) {
		this.arr.push({key: x, value: [], light: []});
		val = this.arr.length-1;
	}
	if (!z)
		this.arr[val].value.push(y);
	else
		this.arr[val].light.push(y);
};

Mpap.prototype.getData = function(x) {
	let res = {index:-1, key:x, value: [], light: []};
	res.index = this.getId(x);
	if (res.index != -1) {
		res.value = this.arr[res.index].value;
		res.light = this.arr[res.index].light;
	}
	return res;
};

Mpap.prototype.getId = function(x) {
	for (let i=0; i<this.arr.length; i++) {
		if (this.arr[i].key.equals(x)) {
			return i;
		}
	}
	return -1;
};

Mpap.prototype.getValue = function(x) {
	let id = this.getId(x);
	if (id == -1) return [];
	return this.arr[id].value;
};

