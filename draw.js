var svgContainer = d3.select("body").append("svg")
									.attr("width", 4000)
									.attr("height", 1080);


// Lasso functions
var lasso_start = function() {
	lasso.items()
		//.attr("r",3.5) // reset size
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
    // Reclass all items
    lasso.items()
        .classed("not_possible",false)
        .classed("possible",false);

    // Style the selected elements
    lasso.selectedItems()
        .classed("selected",true);
        //.attr("r",7);

    // Reset the style of the not selected dots
    lasso.notSelectedItems()
        .attr("fill", "white");
        //.attr("r",3.5);

    // Pull selected elements to create new set

    var newSet = [];
    var selectedElements = lasso.selectedItems()._groups[0]
    if(lasso.selectedItems()._groups[0].length > 0){
    	for(var i = 0; i < selectedElements.length; i++){
    		newSet.push(dic[ selectedElements[i].attributes.key.value ][ selectedElements[i].attributes.set.value ][4]);
    	}
    	createNewSet(newSet);
    }
};


function getRandomColor(number) {
  var letters = ["white","green","red","orange","yellow","pink","grey","purple", "blue",
  				"salmon", "yellowgreen", "maroon", "turquoise", "gold", "mediumvioletred",
  				"peachpuff", "thistle"];
  color = letters[number];
  return color;
}

/*function fillRoundedRect(x, y, w, h, r, color){
  	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.lineWidth="4";
  	ctx.beginPath();
  	ctx.moveTo(x+r, y);
  	ctx.lineTo(x+w-r, y);
  	ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  	ctx.lineTo(x+w, y+h-r);
  	ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  	ctx.lineTo(x+r, y+h);
  	ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  	ctx.lineTo(x, y+r);
  	ctx.quadraticCurveTo(x, y, x+r, y);
  	ctx.strokeStyle = "black";
  	ctx.fillStyle = getRandomColor(color);
  	ctx.fill();
  	ctx.stroke();
}

function fillRoundedRectEle(x, y, w, h, r, color,name){
  	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.lineWidth="4";
  	ctx.beginPath();
  	ctx.moveTo(x+r, y);
  	ctx.lineTo(x+w-r, y);
  	ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  	ctx.lineTo(x+w, y+h-r);
  	ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  	ctx.lineTo(x+r, y+h);
  	ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  	ctx.lineTo(x, y+r);
  	ctx.quadraticCurveTo(x, y, x+r, y);
  	ctx.strokeStyle = "black";
  	ctx.fillStyle = "white";
  	ctx.fill();
  	ctx.stroke();
  	ctx.fillStyle = "black";
  	ctx.font = "15px arial";
  	ctx.textAlign = "center";
  	ctx.fillText(name,x+w/2,y+2*h/3);
}

function rightRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," + y
	   + "h" + (width - radius)
	   + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
	   + "v" + (height - 2 * radius)
	   + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
	   + "h" + (radius - width)
	   + "z";
}*/

function paint(dic){
	svgContainer.selectAll(".set").remove();
	svgContainer.selectAll(".element").remove();
	svgContainer.selectAll(".label").remove();

  for (var key in dic){
		for (var set in dic[key]){
			if(dic[key][set].length == 4){
				// fillRoundedRect(dic[key][set][0], dic[key][set][1], dic[key][set][2], dic[key][set][3], 10, key);
				svgContainer.append("rect")
					.attr("class", "set")
					.attr("x", dic[key][set][0])
					.attr("y", dic[key][set][1])
					.attr("rx", 6)
					.attr("ry", 6)
					.attr("width", dic[key][set][2])
					.attr("height", dic[key][set][3])
					.attr("fill", getRandomColor(key))
					.style("stroke", "black")
					.style("stroke-width", 3);
			} else {
				// fillRoundedRectEle(dic[key][set][0], dic[key][set][1], dic[key][set][2], dic[key][set][3], 10, key, dic[key][set][4]);
				svgContainer.append("rect")
					.attr("class", "element")
					.attr("key", key)
					.attr("set", set)
					.attr("x", dic[key][set][0])
					.attr("y", dic[key][set][1])
					.attr("rx", 6)
					.attr("ry", 6)
					.attr("width", dic[key][set][2])
					.attr("height", dic[key][set][3])
					.attr("fill", "white")
					.style("stroke", "black")
					.style("stroke-width", 3);

				svgContainer.append("text")
					.attr("class", "label")
					.attr("x", dic[key][set][0]+dic[key][set][2]/2)
					.attr("y", dic[key][set][1]+dic[key][set][3]/2)
					.attr("dy", ".3em")
					.attr("font-family", "Verdana")
					.style("font-size", "13.5px")
					.style("text-anchor", "middle")
					.text(dic[key][set][4]);

			}
		}
		if (key != dic.length-1){
			if (key % 2 == 0){
				var height = 10000;
				for (var set in dic[key]){
					if ((dic[key][set][1]-key*14) < height){
						height = dic[key][set][1]-key*14;
					}
				}
				// draw link
				for (var set in dic[key]){
					if (dic[key].length > 1){
						svgContainer.append("rect")
							.attr("class", "link")
							.attr("x", dic[key][set][0]+dic[key][set][2]/2-5)
							.attr("y", height)
							.attr("rx", 3)
							.attr("ry", 3)
							.attr("width", 10)
							.attr("height", dic[key][set][1]-height)
							.style("fill-opacity", "0.6")
							.attr("fill", getRandomColor(key))
							.style("stroke", "black")
							.style("stroke-width", 1);
					}
				}
				for (var set in dic[key]){
					var nextset = parseInt(set)+1;
					if (nextset < dic[key].length && dic[key].length>1){
						svgContainer.append("rect")
							.attr("class", "link")
							.attr("x", dic[key][set][0]+dic[key][set][2]/2-5)
							.attr("y",height-5)
							.attr("rx", 3)
							.attr("ry", 3)
							.attr("width", dic[key][""+nextset][0]+dic[key][""+nextset][2]/2-dic[key][set][0]-dic[key][set][2]/2+10)
							.attr("height", 10)
							.style("fill-opacity", "0.6")
							.attr("fill", getRandomColor(key))
							.style("stroke", "black")
							.style("stroke-width", 1);
					}
				}
			} else {
				var height = 0;
				for (var set in dic[key]){
					if ((dic[key][set][1]+dic[key][set][3]+key*14) > height){
						height = dic[key][set][1]+dic[key][set][3]+key*14;
					}
				}
				// draw link
				for (var set in dic[key]){
					if (dic[key].length > 1){
						svgContainer.append("rect")
							.attr("class", "link")
							.attr("x", dic[key][set][0]+dic[key][set][2]/2-5)
							.attr("y", dic[key][set][1]+dic[key][set][3])
							.attr("rx", 3)
							.attr("ry", 3)
							.attr("width", 10)
							.attr("height", height-dic[key][set][1]-dic[key][set][3])
							.style("fill-opacity", "0.6")
							.attr("fill", getRandomColor(key))
							.style("stroke", "black")
							.style("stroke-width", 1);
					}
				}
				for (var set in dic[key]){
					var nextset = parseInt(set)+1;
					if (nextset < dic[key].length && dic[key].length>1){
						svgContainer.append("rect")
							.attr("class", "link")
							.attr("x", dic[key][set][0]+dic[key][set][2]/2-5)
							.attr("y",height-5)
							.attr("rx", 3)
							.attr("ry", 3)
							.attr("width", dic[key][""+nextset][0]+dic[key][""+nextset][2]/2-dic[key][set][0]-dic[key][set][2]/2+10)
							.attr("height", 10)
							.style("fill-opacity", "0.6")
							.attr("fill", getRandomColor(key))
							.style("stroke", "black")
							.style("stroke-width", 1);
					}
				}
			}
		}
  }

  selectables = svgContainer.selectAll(".element");
	lasso = d3.lasso()
            .closePathSelect(true)
            .closePathDistance(100)
            .items(selectables)
            .targetArea(svgContainer)
            .on("start",lasso_start)
            .on("draw",lasso_draw)
            .on("end",lasso_end);

	svgContainer.call(lasso);

}

function design(tree,x1,y1,dic){
	var coordinate;
	var x2 = x1+10;
	var y2 = y1+10;
	// to arrange elements in rows
	var xcount = 0;
	var xleft = x2
	var elementx = x2;
	var elementy = y1+10;
	for (var i = 0; i < tree.elements.length; i++){
		xlength = tree.elements[i].length*8;
		dic[dic.length-1].push([elementx, elementy, xlength+10, 30, tree.elements[i]]);
		elementx = elementx + xlength + 20;
		if (x2 < elementx){
			x2 = elementx;
		}
		xcount++;
		if (xcount == 4){
			xcount = 0;
			elementx = xleft;
			elementy += 60;
			y2 = elementy;
		}
	}

	if ( xcount != 0 ){
		y2 += 60;
	}
	for(var i = 0; i < tree.children.length; i++){
		coordinate = design(tree.children[i],x2,y1+10,dic);
		x2 = coordinate[0]+10;
		if (coordinate[1]+10 > y2) {
			y2 = coordinate[1]+10;
		}
	}
	dic[tree.set].push([x1, y1, x2-x1, y2-y1]);
	return [x2,y2];
}

function drawComED(hierarchy, numsets){
	testhierarchy = [ 	{"set": 0, "elements": [4],
							"children": [
								{"set": 1, "elements": [5,12,4,5],
									"children": [
										{"set": 2, "elements": [6], "children": []},
										{"set": 2, "elements": [6],
											"children": [
												{"set": 3, "elements": [6], "children": []},{"set": 3, "elements": [6],"children": [
													{"set": 4, "elements": [6], "children": []},{"set": 4, "elements": [6], "children": []}, {"set": 4, "elements": [6], "children": []}
											]},
												{"set": 3, "elements": [6], "children": []}
										]}
									]
								},
								{"set": 2, "elements": [2],
									"children": [
										{"set": 3, "elements": [1], "children": []}
									]
								}
							]
					  	},
					  	{"set": 1, "elements": [8],
					  		"children": [
					  			{"set": 2, "elements": [3], "children": []}
					  		]
					  	},
					  	{"set": 2, "elements": [0], "children": []},
					  	{"set": 3, "elements": [7], "children": []}
					];

	console.log("hierarchy");
	console.log(hierarchy);
	//dic = {0:new Array(),1:new Array(),2:new Array(),3:new Array(),4:new Array(),5:new Array(),6:new Array()};
	dic = [];
	for(var i = 0; i < numsets+2; i++){
		dic.push(new Array());
	}
	var test = {"set": 0, "elements": [], "children": hierarchy};
	design(test,50,50,dic);
	paint(dic);


}

function drawDupED(setlist, elementlist){

}


//drawComED();
