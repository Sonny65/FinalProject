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

    if (rowidth>1280) {
      graphx = 0;
      graphy = rowheight+10;
      rowheight += 10;
    } else {
      graphx = rowidth;
    }

    rowidth = 0;
    graphx += 10;
  }

  return [setdic,eledic];
}

function DupPaint(designinfo){
  var setdic = designinfo[0];
  var eledic = designinfo[1];

  svgContainer.selectAll(".set").remove();
	svgContainer.selectAll(".element").remove();
	svgContainer.selectAll(".link").remove();

  for (var set in setdic){
    svgContainer.append("rect")
      .attr("class", "set")
      .attr("x", setdic[set][0])
      .attr("y", setdic[set][1])
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("width", setdic[set][2])
      .attr("height", setdic[set][3])
      .attr("fill", getRandomColor(setdic[set][4]))
      .style("stroke", "black")
      .style("stroke-width", 3);
  }

  drawlink(eledic);

  for (var elements in eledic){
    for (var element in eledic[elements]){
      svgContainer.append("rect")
        .attr("class", "set")
        .attr("x", eledic[elements][element][0])
        .attr("y", eledic[elements][element][1])
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("width", eledic[elements][element][2])
        .attr("height", eledic[elements][element][3])
        .attr("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", 3);

        svgContainer.append("text")
  				//.attr("class", "label")
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
        svgContainer.append("line")
  				//.attr("class", "label")
  				.attr("x1", function(d){ return eledic[elements][element][0] + eledic[elements][element][2]/2; })
  				.attr("y1", function(d){ return eledic[elements][element][1] + eledic[elements][element][3]/2; })
  				.attr("x2", x)
  				.attr("y2", y)
          .style("stroke", "black")
          .style("stroke-opacity", 0.5)
          .style("stroke-width", 10);
      }
    }
  }
}

function drawDupED(setlist, elementlist){
	var designinfo = DupDesign(setlist);
  DupPaint(designinfo);
}
