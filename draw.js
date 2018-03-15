function getRandomColor(number) {
  var letters = ["green","red","orange","yellow","pink","grey"];
  color = letters[number];
  return color;
}

function fillRoundedRect(x, y, w, h, r, color){
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
  	ctx.font = "15px Comic Sans MS";
  	ctx.fillText(name,x+4,y+25);
}

function paint(dic){
  for (var key in dic){
    for (var set in dic[key]){
    	if(dic[key][set].length == 4){
    		fillRoundedRect(dic[key][set][0], dic[key][set][1], dic[key][set][2], dic[key][set][3], 10, key);
    	} else {
    		fillRoundedRectEle(dic[key][set][0], dic[key][set][1], dic[key][set][2], dic[key][set][3], 10, key, dic[key][set][4])
    	}
    }
  }
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
		dic[6].push([elementx, elementy, xlength+10, 50, tree.elements[i]]);
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

function drawComED(hierarchy){
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

    var dic = {0:new Array(),1:new Array(),2:new Array(),3:new Array(),4:new Array(),5:new Array(),6:new Array()};
    var test = {"set": 0, "elements": [], "children": hierarchy};
	design(test,50,50,dic);
    paint(dic);

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var lasso = d3.lasso()
            .closePathSelect(true)
            .closePathDistance(100)
            .items(circles)
            .targetArea(svg)
            .on("start",lasso_start)
            .on("draw",lasso_draw)
            .on("end",lasso_end);

	ctx.call(lasso);

}


        

//drawComED();
