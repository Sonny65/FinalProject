var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom;
var svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var setList = [ {"name": "blue", "elements": ["3","5","6","8"], "id": 0},
			 {"name": "orange", "elements": ["1","2","4","5","6"], "id": 0},
			 {"name": "green", "elements": ["0","1","2","3"], "id": 0},
			 {"name": "pink", "elements": ["1","6","7"], "id": 0} ];
var elementList = [ {"name": "0"},
				 {"name": "1"},
				 {"name": "2"},
				 {"name": "3"},
				 {"name": "4"},
				 {"name": "5"},
				 {"name": "6"},
				 {"name": "7"},
				 {"name": "8"} ];

sortSets(setList);

function compareSets(a, b){
	if(a.elements.length > b.elements.length){
		return -1;
	}
	if(a.elements.length < b.elements.length){
		return 1;
	}
	return 0;
}

function compareSetLists(a, b){
	var maxlength = b.sets.length
	var blonger = false;
	if(a.sets.length < b.sets.length){
		maxlength = a.sets.length;
		blonger = true;
	}
	for(var i = 0; i < maxlength; i++){
		if(a.sets[i] < b.sets[i]){
			return -1;
		}
		if(a.sets[i] > b.sets[i]){
			return 1;
		}
	}
	if(blonger){
		return -1;
	}
	return 1;
}

function sortSets(){
	//assign a unique integer label to each set such that 
	//the labels increase as sets decrease in size
	setList.sort(compareSets);
	for(var i = 0; i < setList.length; i++){
		setList[i].id = i;
	}
	console.log(setList);

	//for each element do
	//	Construct a list of labels for all sets of which the element is a member
	//end for
	for(var i = 0; i < elementList.length; i++){
		elementList[i].sets = [];
		for(var setnum = 0; setnum < setList.length; setnum++){
			for(var j = 0; j < setList[setnum].elements.length; j++){
				if(elementList[i].name == setList[setnum].elements[j]){
					elementList[i].sets.push(setnum);
					break;
				}
			}
		}
	}
	console.log(elementList);
	//Sort each list such that the labels increase monotonically

	//Sort the list of lists of set labels lexically
	elementList.sort(compareSetLists);
	console.log(elementList);

	//Construct a group for the first label in the first list

	//for each remaining label in the first list do
	//	Construct a group such that the group corresponding to each label 
	//	is nested inside the previous group
	//	Add the first item as a child of the inner-most group
	//end for

	//for each remaining list of set labels do
	//	Construct groups for each of the sets in the list that differ from 
	//	those in the previously processed list (nested as before)
	//	Add the item as a child of the inner-most group
	//end for

	//Connect with an edge all groups with the same label
}

function ComEDRecursive(){
	
}