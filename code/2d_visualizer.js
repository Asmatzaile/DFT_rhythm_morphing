// https://docs.cycling74.com/max8/vignettes/jsmgraphics
// https://cycling74.com/forums/jsui-mgraphics-patch-a-day
// https://docs.cycling74.com/max8/refpages/jsui

mgraphics.init()
mgraphics.relative_coords = 1
mgraphics.autofill = 0



var point_size = 0.05

var min_y = -1
var max_y = 1
var min_x = -1
var max_x = 1

var aspect
var x_size
var y_size
var coordinates = []

var pointArray

function list() {
    coordinates = chunk(arrayfromargs(arguments))
    set_bounds()
    mgraphics.redraw()
}


function chunk(arr) {
    var myArray = []
    for (var i = 0; i < arr.length; i += 2) {
        myArray.push(arr.slice(i, i + 2));
    }
    return myArray
}

function set_bounds() {
    min_y = min_x = -1
    max_y = max_x = 1
    for (var i = 0; i < coordinates.length; i+=1) {
        pair = coordinates[i]
        if (pair[0] < min_x) min_x = pair[0]
        if (pair[0] > max_x) max_x = pair[0]
        if (pair[1] < min_y) min_y = pair[1]
        if (pair[1] > max_y) max_y = pair[1]
    }
    min_x *= 1.2
    max_x *= 1.2
    min_y *= 1.2
    max_y *= 1.2
}

// the paint function is where you put the drawing code. This function is called every time that the jsui object decides that the object needs to draw itself. You can also force a repaint by calling the function mgraphics.redraw().
function paint() {

    init_canvas()

    paint_background()

    paint_points(coordinates)

}

// this function is called whenever a bang arrives to the Max jsui object.
function bang() {
    mgraphics.redraw()
}

function paint_points(cartesian_pairs) {
	
	if (cartesian_pairs.length == 0) return
	
    with(mgraphics) {
        select_font_face("Arial")
        set_font_size(12)
    }

    var firstpair
    var lastpair

    for (var i = 0; i < cartesian_pairs.length; i++) {
        with(mgraphics) {
            pair = cartesian_pairs[i]
            var previous_pair

            set_source_rgba(0.808, 0.898, 0.91, 1)
            // draw the line
            if (i == 0) {
                firstpair = pair
                lastpair = pair
            } else {
                set_line_cap("round")
                set_line_join("round")
                move_to(normalize_x(lastpair[0]), normalize_y(lastpair[1]))
                line_to(normalize_x(pair[0]), normalize_y(pair[1]))
                stroke()
                lastpair = pair
			}

            // draw the circle
            ellipse((normalize_x(pair[0]) - point_size * aspect / 2), normalize_y(pair[1])+point_size/2, point_size*aspect, point_size)
            fill()

            // draw the text
            move_to(normalize_x(pair[0]+0.1),normalize_y(pair[1]))
            text_path((i+1).toString())
            // set_source_rgba(0.2, 0.2, 0.2, 1)
            fill()
            
        }  
    }

    with(mgraphics) {
        set_source_rgba(0.808, 0.898, 0.91, 1)
        move_to(normalize_x(lastpair[0]), normalize_y(lastpair[1]))
        line_to(normalize_x(firstpair[0]), normalize_y(firstpair[1]))
        stroke()
    }
   }

function init_canvas() {
    aspect = calc_aspect()

    x_size = max_x - min_x
    y_size = max_y - min_y
}

function paint_background() {
    // we have to put the "mgraphics." prefix before every function, or use a "with(mgraphics) {}" block.
    with (mgraphics) {
        
        // draw the background
        rectangle(-1 * aspect, 1, 2 * aspect, 2)
        set_source_rgba(0.2, 0.2, 0.2, 1)
        fill()


        set_source_rgba(0.502, 0.502, 0.502, 1)

        // draw the axes
        move_to(-1 * aspect, normalize_y(0))
        line_to(1 * aspect, normalize_y(0))
        move_to(normalize_x(0), -1)
        line_to(normalize_x(0), 1)
        stroke()

        
        // draw goniometric circle
        ellipse(normalize_x(-1),normalize_y(1),scale_x(4),scale_y(4))
        stroke()
    }
}


//  https://stats.stackexchange.com/a/178629

function normalize_x(x_coordinate) {
    return (2*(x_coordinate-min_x)/(max_x-min_x) - 1) * aspect    
}

function normalize_y(y_coordinate) {
    return 2*(y_coordinate-min_y)/(max_y-min_y) - 1
}

function scale_x(width) {
    return width / x_size * aspect
}

function scale_y(height) {
    return height / y_size
}

// When relative_coords are = 1,
// y-coordinates always are -1 to 1,
// but x-coordinates depend on the aspect
function calc_aspect() {
    var width = this.box.rect[2] - this.box.rect[0]
    var height = this.box.rect[3] - this.box.rect[1]
    return width / height
}