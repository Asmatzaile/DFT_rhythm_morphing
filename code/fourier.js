include("complex.min")

var i = new Complex(0, 1);
var e = new Complex(Math.E);

// Discrete Fourier Transform.
// This implementation takes an array of real numbers and outputs a list with cartesian pairs.
function dft(list) {
	array_x = arrayfromargs(arguments);
	array_x = array_x.map(function(x) {
	return new Complex(x, 0);
	});

	array_X = []
	N = array_x.length
	for(k=0;k<N;k++) {
	array_X[k] =
		array_x.reduce(function(accumulator, currentElement, currentIndex) {
		sumElement = currentElement.mul(e.pow(i.mul(-2*Math.PI/N*k*currentIndex)));
		sum = accumulator.add(sumElement);
		return sum
		});
	}

	cartesianpairs_array_X = array_X.reduce(function(accumulator, currentElement) {
	cartesian_x = currentElement.re;
	cartesian_y = currentElement.im;

	accumulator.push(currentElement.re);
	accumulator.push(currentElement.im);
	return accumulator
	}, []);

	outlet(0, cartesianpairs_array_X);
}

// Inverse Discrete Fourier Transform.
// This implementation takes a list with cartesian pairs and outputs an array of real numbers.
function idft(list) {

	array_X = cartesianpairs_2_complex(arrayfromargs(arguments));
	
	for(k=0;k<N;k++) {
		
		array_x[k] =
					array_X.reduce(function(accumulator, currentElement, currentIndex) {
					sumElement = currentElement.mul(e.pow(i.mul(2*Math.PI/N*k*currentIndex)));
					sum = accumulator.add(sumElement);
					return sum
					}).div(N);
	}
	
	realpart_array_x = array_x.map(function(x) {
		return x.re;
	});
	
	outlet(0, realpart_array_x);
}


function cartesianpairs_2_complex(arr) {
		var myArray = [];
		for(var j = 0; j < arr.length; j += 2) {
			myArray.push(new Complex(arr[j], arr[j+1]));
		}
	return myArray;
}