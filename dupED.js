//Drag functions
function drag2_start(){
  d3.select(this).raise().classed("active", true);
  d3.select(this).select("rect")
    .style("stroke-width", 3)
    .style("cursor", "grabbing");
  d3.select(this).select("text")
    .style("cursor", "grabbing");
}

function drag2_move(){
  var es = d3.select(this).select("rect").attr("elements");
  var e = d3.select(this).select("rect").attr("element");

  d3.select(this).select("rect")
    .attr("x", eledic[es][e][0] = (d3.event.x - eledic[es][e][2]/2))
    .attr("y", eledic[es][e][1] = (d3.event.y - eledic[es][e][3]/2))
    .style("stroke-width", 3)
    .style("cursor", "grabbing");
  d3.select(this).select("text")
    .attr("x", (d3.event.x))
    .attr("y", (d3.event.y))
    .style("cursor", "grabbing");

  drawlink(eledic);
  drawelements(eledic);

}

function drag2_end(){
  d3.select(this).classed("active", false);
  d3.select(this).select("rect")
    .style("stroke-width", 2)
    .style("cursor", "auto");
  d3.select(this).select("text")
    .style("cursor", "auto");

}

function DupDesign(setlist){
  var setdic = [];
  var eledic = [];
  var graphx = 0;
  var graphy = 0;
  var graphwidth = 0;
  var graphheight = 0;
  var rowheight = graphy;

  for (var set in setlist){
    var x = graphx;
    var y = graphy;
    var width = 0;
    var height = 0;
    var name = "";
    var array = new Array();
    var count = 0;
    var rowidth = 0;
    for (var element in setlist[set]["elements"]){
      var clength = setlist[set]["elements"][element].length;
      name = setlist[set]["elements"][element];

      // assign elements
      x += 10;
      width = clength * 14;
      height = 20;
      if (name in eledic) {
        eledic[name].push([x,y+10,width,height]);
      } else {
        eledic[name] = [[x,y+10,width,height]];
      }
      x += width;
      if (x+10 > rowidth){
        rowidth = x+10;
      }

      if (count == 4){
        x = graphx;
        y += 30;
        if (y > rowheight){
            rowheight = y;
        }
        count = 0;
      } else {
        count ++;
      }

    }

    //assign sets
    if (count == 0){
      setdic[set] = [graphx,graphy,rowidth - graphx, y-graphy+10, setlist[set]["id"]];
    } else {
      setdic[set] = [graphx,graphy,rowidth - graphx, y-graphy+40, setlist[set]["id"]];
      rowheight += 30;
    }

    if (rowidth>1000) {
      graphx = 0;
      graphy = rowheight+10;
      rowheight += 10;
    } else {
      graphx = rowidth;
    }

    rowidth = 0;
    graphx += 10;
  }

  console.log("setlist");
  console.log(setlist);
  console.log("setdic");
  console.log(setdic);
  console.log("eledic");
  console.log(eledic);
  return [setdic,eledic];
}

function DupPaint(designinfo){
  var setdic = designinfo[0];
  eledic = designinfo[1];

  svgContainer2.selectAll(".set").remove();
	svgContainer2.selectAll(".element").remove();
	svgContainer2.selectAll(".link").remove();

  for (var set in setdic){
    svgContainer2.append("rect")
      .attr("class", "set")
      .attr("set", set)
      .attr("x", setdic[set][0])
      .attr("y", setdic[set][1])
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("width", setdic[set][2])
      .attr("height", setdic[set][3])
      .attr("fill", getRandomColor(setdic[set][4]))
      .style("stroke", getRandomOuterColor(setdic[set][4]))
      .style("stroke-width", 3)
      .on("mouseover", function(){
          div.transition()
            .duration(100)
            .style("opacity", 1);
          console.log(newSetList);
          var index = d3.select(this).attr("set");
          console.log(index);
          div.html("Organization: " + newSetList[index].name)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");       
        })
        .on("mouseout", function(){
          div.transition()
            .duration(100)
            .style("opacity", 0);
        });
  }

  drawlink(eledic);
  drawelements(eledic);
}

function drawelements(eledic){
  svgContainer2.selectAll(".element2").remove();

  for (var elements in eledic){
      for (var element in eledic[elements]){
        var group = svgContainer2.append("g")
            .attr("class", "element2")
            .call(d3.drag()
              .on("start", drag2_start)
              .on("drag", drag2_move)
              .on("end", drag2_end));

        group.append("rect")
          .attr("class", "element2box")
          .attr("elements", elements)
          .attr("element", element)
          .attr("x", eledic[elements][element][0])
          .attr("y", eledic[elements][element][1])
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("width", eledic[elements][element][2])
          .attr("height", eledic[elements][element][3])
          .attr("fill", "white")
          .style("stroke", "black")
          .style("stroke-width", 2);

          group.append("text")
            .attr("class", "element2label")
            .attr("x", function(d){ return eledic[elements][element][0] + eledic[elements][element][2]/2; })
            .attr("y", function(d){ return eledic[elements][element][1] + eledic[elements][element][3]/2; })
            .attr("dy", ".3em")
            .attr("font-family", "Verdana")
            .style("font-size", "13.5px")
            .style("text-anchor", "middle")
            .text(elements);
      }
    }
}

function drawlink(eledic){
  svgContainer2.selectAll("line").remove();

  for (var elements in eledic){
    if (eledic[elements].length > 1){
      var x = 0;
      var y = 0
      for (var element in eledic[elements]){
        x += eledic[elements][element][0] + eledic[elements][element][2]/2;
        y += eledic[elements][element][1] + eledic[elements][element][3]/2;
      }
      x = x/eledic[elements].length;
      y = y/eledic[elements].length;
      for (var element in eledic[elements]){
        svgContainer2.append("line")
  				//.attr("class", "label")
  				.attr("x1", function(d){ return eledic[elements][element][0] + eledic[elements][element][2]/2; })
  				.attr("y1", function(d){ return eledic[elements][element][1] + eledic[elements][element][3]/2; })
  				.attr("x2", x)
  				.attr("y2", y)
          .style("stroke", "black")
          .style("stroke-opacity", 0.7)
          .style("stroke-width", 5);
      }
    }
  }
}

function drawDupED(setlist, elementlist){
	var designinfo = DupDesign(setlist);
  DupPaint(designinfo);
}
