function drawComED(){
	testhierarchy = [ 	{"set": 0, "elements": [4], 
							"children": [ 
								{"set": 1, "elements": [5], 
									"children": [ 
										{"set": 3, "elements": [6]}
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

	
	console.log(testhierarchy);
}

drawComED();