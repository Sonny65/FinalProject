function draw(tree,x1,y1){
	var coordinate;
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.lineWidth="3";
	if(tree.hasOwnProperty("children")){
		x2 = x1+50;
		y2 = y1+50;
		maxY =
		for(var i = 0; i < tree.children.length; i++){
			coordinate = draw(tree.children[i],x2,y1+50);
			x2 = coordinate[0]+50;
			if (coordinate[1]+50 > y2) {
				console.log(y2+"before");
				y2 = coordinate[1]+50;
				console.log(y2);
			}
		}
		ctx.rect(x1, y1, x2-x1, y2-y1);
		ctx.stroke();
		return [x2,y2];
	} else {
		x2 = x1 + 50;
		ctx.rect(x1, y1, 50, 50);
		ctx.stroke();
		return [x2,y1 + 50];
	}
}

function drawComED(){
	testhierarchy = [ 	{"set": 0, "elements": [4],
							"children": [
								{"set": 1, "elements": [5],
									"children": [
										{"set": 3, "elements": [6]},
										{"set": 3, "elements": [6],
											"children": [
												{"set": 3, "elements": [6]},{"set": 3, "elements": [6],"children": [
													{"set": 3, "elements": [6]},{"set": 3, "elements": [6]}, {"set": 3, "elements": [6]}
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


	draw(testhierarchy[0],50,50);
}

drawComED();
