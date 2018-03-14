var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom;
var svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



function lassoSelection(){
	var x = event.clientX;
	var y = event.clientY;	
}