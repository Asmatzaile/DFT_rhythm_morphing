inlets = 1;
outlets = 2;

var pair1;
var pair2;


function gamma() {
	
	if (arguments.length != 2) {
		argumentError(2, arguments.length);
		return;
	}
	
	pair1 = arguments[0];
	pair2 = arguments[1];
	
	pair2 = pair1 + pair2;
	
	outlet(0, pair1, pair2);

}

function delta() {
	
	if (arguments.length != 2) {
		argumentError(2, arguments.length);
		return;
	}
	
	pair1 = arguments[0];
	pair2 = arguments[1];
	
	pair1 = pair2 + pair1;
	
	outlet(0, pair1, pair2);
	
	
}



function argumentError(expected_arguments, given_arguments) {
	post("ArgumentError: expected " + expected_arguments + " arguments. Given " + given_arguments);
	post();
}