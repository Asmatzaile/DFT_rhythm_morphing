var word = ""

function setword() {
	word = arrayfromargs(arguments).join(" ")
	output()
}

function append() {
	word = word + arrayfromargs(arguments).join(" ")
	output()
}

function prepend() {
	word = arrayfromargs(arguments).join(" ") + word
	output()
}

function clear() {
	word = ""
	output()
}

function pop() {
	array = word.split("")
	array.pop()
	word = array.join("")
	output()
}

function shift() {
	array = word.split("")
	array.shift()
	word = array.join("")
	output()
}

function rotate_right() {
	if (word == "") return
	array = word.split("")
	last = array.pop()
	word = last + array.join("")
	output()
}


function rotate_left() {
	if (word == "") return
	array = word.split("")
	initial = array.shift()
	word = array.join("") + initial
	output()
}
	
	
function output() {
	outlet(0, word.split(" "))
	}