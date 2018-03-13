function getRandomColor(number) {
  var letters = ["green","red","orange","yellow","pink","purple"];
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

function paint(dic){
  for (var key in dic){
    for (var set in dic[key]){
      fillRoundedRect(dic[key][set][0], dic[key][set][1], dic[key][set][2], dic[key][set][3], 25, key);
    }
  }
}

function design(tree,x1,y1,dic){
	var coordinate;
	if(tree.hasOwnProperty("children")){
		var x2 = x1+50;
		var y2 = y1+50;
		for(var i = 0; i < tree.children.length; i++){
			coordinate = design(tree.children[i],x2,y1+50,dic);
			x2 = coordinate[0]+50;
			if (coordinate[1]+50 > y2) {
				y2 = coordinate[1]+50;
			}
		}
    dic[tree.set].push([x1, y1, x2-x1, y2-y1]);
    // fillRoundedRect(x1, y1, x2-x1, y2-y1, 25, tree.set);
		return [x2,y2];
	} else {
		x2 = x1 + 50;
    dic[tree.set].push([x1, y1, 50, 50]);
    // fillRoundedRect(x1, y1, 50, 50, 25, tree.set);
		return [x2,y1 + 50];
	}
}

function drawComED(){
	testhierarchy = [ 	{"set": 0, "elements": [4],
							"children": [
								{"set": 1, "elements": [5],
									"children": [
										{"set": 2, "elements": [6]},
										{"set": 2, "elements": [6],
											"children": [
												{"set": 3, "elements": [6]},{"set": 3, "elements": [6],"children": [
													{"set": 4, "elements": [6]},{"set": 4, "elements": [6]}, {"set": 4, "elements": [6]}
											]},
												{"set": 3, "elements": [6]}
										]}
									]
								},
								{"set": 2, "elements": [2],
									"children": [
										{"set": 3, "elements": [1]}
									]
								}
							]
					  	},
					  	{"set": 1, "elements": [8],
					  		"children": [
					  			{"set": 2, "elements": [3]}
					  		]
					  	},
					  	{"set": 2, "elements": [0]},
					  	{"set": 3, "elements": [7]}
					];

    var dic = {0:new Array(),1:new Array(),2:new Array(),3:new Array(),4:new Array(),5:new Array(),6:new Array()};
    test = {"set": 0, "elements": [4], "children": testhierarchy}
	  design(test,50,50,dic);
    paint(dic);
}

drawComED();
