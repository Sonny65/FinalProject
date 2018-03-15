var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom;
var svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = new Array(100).fill(null).map(m=>[Math.random(),Math.random()]);
var w = 960;
var h = 500;
var r = 3.5;

var svg = d3.select("body").append("svg")
            .attr("width",w)
            .attr("height",h);
        
var circles = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx",d=>d[0]*w)
            .attr("cy",d=>d[1]*h)
            .attr("r",r);
        
// Lasso functions
var lasso_start = function() {
	lasso.items()
		.attr("r",3.5) // reset size
		.classed("not_possible",true)
		.classed("selected",false);
};

var lasso_draw = function() {
	// Style the possible dots
	lasso.possibleItems()
		.classed("not_possible",false)
		.classed("possible",true);

	// Style the not possible dot
	lasso.notPossibleItems()
		.classed("not_possible",true)
	.classed("possible",false);
        };

        var lasso_end = function() {
            // Reset the color of all dots
            lasso.items()
                .classed("not_possible",false)
                .classed("possible",false);

            // Style the selected dots
            lasso.selectedItems()
                .classed("selected",true)
                .attr("r",7);

            // Reset the style of the not selected dots
            lasso.notSelectedItems()
                .attr("r",3.5);

        };
        
        var lasso = d3.lasso()
            .closePathSelect(true)
            .closePathDistance(100)
            .items(circles)
            .targetArea(svg)
            .on("start",lasso_start)
            .on("draw",lasso_draw)
            .on("end",lasso_end);
        
        svg.call(lasso);