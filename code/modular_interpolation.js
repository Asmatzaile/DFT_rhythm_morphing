inlets = 3

var interp_coeff = []
var list1 = []
var list2 = []

pi = Math.PI


function list(){
	
	array = arrayfromargs(arguments)
	
	if (inlet==1) list1 = array
	if (inlet==2) list2 = array
	if (inlet==0) {
		interp_coeff = array
		outlet(0, interpolate())
	}
}

function interpolate(){
	return interp_coeff.map(function(element,index){
		el1 = list1[index]
		el2 = list2[index]
		coeff = element
		if ((el2-el1) > 3.14) el1 < el2 ? el1 += 2*pi : el2 += 2*pi
		return (el1+(el2-el1)*coeff + pi) % (2*pi) - pi
})

}

post