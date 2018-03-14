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

d3.text('Organizations.csv', function(error, data){
	if(error) throw error;

	var newSetList = [];
	var newElementList = [];

	data = d3.csvParseRows(data);

	for(var i = 0; i < data[0].length; i++){
		newSetList.push({"name": data[0][i], "elements": [], "id": 0});
	}

	var tempElementList = []
	for(var i = 1; i < data.length; i++){
		for(var j = 0; j < data[0].length; j++){
			if(data[i][j] != ""){
				newSetList[j].elements.push(data[i][j]);
				tempElementList.push(data[i][j]);
			}
		}
	}

	tempElementList = [...new Set(tempElementList)];
	for(var i = 0; i < tempElementList.length; i++){
		newElementList.push({"name": tempElementList[i]});
	}
	console.log("newSetList");
	console.log(newSetList);
	console.log("newElementList");
	console.log(newElementList);	

	var setHierarchy = sortSets(newSetList, newElementList);
	console.log("setHierarchy");
	console.log(setHierarchy);
	//drawComED(setHierarchy);
});



//var testSetHierarchy = sortSets(setList, elementList);
//console.log(testSetHierarchy); 

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

function sortSets(setlist, elementlist){
	//assign a unique integer label to each set such that 
	//the labels increase as sets decrease in size
	setlist.sort(compareSets);
	for(var i = 0; i < setlist.length; i++){
		setlist[i].id = i+1;
	}

	//for each element do
	//	Construct a list of labels for all sets of which the element is a member
	//end for
	for(var i = 0; i < elementlist.length; i++){
		elementlist[i].sets = [];
		for(var setnum = 0; setnum < setlist.length; setnum++){
			for(var j = 0; j < setlist[setnum].elements.length; j++){
				if(elementlist[i].name == setlist[setnum].elements[j]){
					elementlist[i].sets.push(setlist[setnum].id);
					break;
				}
			}
		}
	}
	//Sort each list such that the labels increase monotonically

	//Sort the list of lists of set labels lexically
	elementlist.sort(compareSetLists);

	//Construct a group for the first label in the first list
	var hierarchy = [];
	hierarchy.push({"set": elementlist[0].sets[0], 
		"elements": [], "children": [] });

	//for each remaining label in the first list do
	//	Construct a group such that the group corresponding to each label 
	//	is nested inside the previous group
	//	Add the first item as a child of the inner-most group
	//end for
	var temp = hierarchy[0];
	for(var i = 1; i < elementlist[0].sets.length; i++){
		temp.children.push({"set": elementlist[0].sets[i], 
			"elements": [], "children": [] });
		temp = temp.children[0];
	}
	temp.elements.push(elementlist[0].name);

	//for each remaining list of set labels do
	//	Construct groups for each of the sets in the list that differ from 
	//	those in the previously processed list (nested as before)
	//	Add the item as a child of the inner-most group
	//end for
	start = 0;
	for(var i = 1; i < elementlist.length; i++){
		//check first
		temp = hierarchy[start];
		if(temp.set != elementlist[i].sets[0]){ //first set doesn't matches
			start += 1;
			hierarchy.push({"set": elementlist[i].sets[0], 
				"elements": [], "children": []});
			temp = hierarchy[start];
			for(var j = 1; j < elementlist[i].sets.length; j++){
				temp.children.push({"set": elementlist[i].sets[j], 
					"elements": [], "children": [] });
				temp = temp.children[0];
			}
			temp.elements.push(elementlist[i].name);
		}
		else{ //first set matches
			for(var j = 1; j < elementlist[i].sets.length; j++){
				//check for next match
				var matchfound = false;
				for(var k = 0; k < temp.children.length; k++){
					if(temp.children[k].set == elementlist[i].sets[j]){
						matchfound = true;
						temp = temp.children[k];
						break;
					}
				}
				if(!matchfound){ // if no match found, create next layer
					temp.children.push({"set": elementlist[i].sets[j],
						"elements": [], "children": []});
					temp = temp.children[temp.children.length-1];
				}
			}
			temp.elements.push(elementlist[i].name);
		}
		
	}

	console.log(hierarchy);
	return hierarchy;

	//Connect with an edge all groups with the same label
}
