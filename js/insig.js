
      
      
const insig_render = async () => {

      
      const d = await d3.csv("data/stats_new.csv");
          // d['name'] = d.Name;
          // d['founded'] = d['Founding Year'];
          // d['insignias'] = d.Insignia;
          // d['location'] = d['Location'];
          // d['id'] = d.Name;

    console.log(d);

      let insig = d3.select("#insignia_wall");

      
    insig.attr("width","1250px")
    .attr("height", "800px") 
      
      let insig_group = insig.append("g").attr("id", "insig_group");
      

      let tooltip_width = 180;
        let tooltip_height = 64;



        // now add the tooltip
        let tooltip = insig.append("g")
          .attr("class", "tooltip")
          .attr("visibility", "hidden")
          .style("z-index", 100);

        tooltip.append("rect")
          .attr("fill", "#F2F4F3")
          .attr("opacity", 1)
          .attr("width", tooltip_width)
          .attr("height", tooltip_height);

        //create the text box with info about the restuarant being hovered over
        let name_text = tooltip.append("text")
          .attr("fill", "#0A0908")
          .attr("font-family", "'Noto Serif', serif")
          .attr("color", "#0A0908")
          .attr("font-weight", "700")
          .attr("font-size", "15px")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "hanging")
          .attr("x", tooltip_width / 2.0)
          .attr("y", 5);

        let founding_text = tooltip.append("text")
          .attr("fill", "#0A0908")
          .attr("font-family", "'Noto Serif', sans-serif")
          .attr("font-size", "15px")
          .attr("font-weight", "300")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "hanging")
          .attr("x", tooltip_width / 2.0)
          .attr("y", 25);

        
         let loc_text = tooltip.append("text")
          .attr("fill", "#0A0908")
          .attr("font-family", "'Noto Serif', sans-serif")
          .attr("font-size", "15px")
          .attr("font-weight", "300")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "hanging")
          .attr("x", tooltip_width / 2.0)
          .attr("y", 45);



      function insigmouseover(d, i) {  // Add interactivity
        // Use D3 to select element, change color and size

        tooltip.style("visibility", "visible").style("z-index", 100);
    
        let select = d3.select(this)
        console.log(select.datum())
        console.log( d3.event.pageX, d3.event.pageY)
        name_text.text(function() {
          if (select.datum().Name == "Indian Motorcycle Riders Group of Mineola, Inc."){
            return "Indian Motorcycle Riders"
          }
          else {
            return select.datum().Name;
          }
        }
          
        
        );
            tooltip.attr("transform", "translate(" + (d3.event.pageX-100) + "," + (d3.event.pageY-6635) + ")");
        founding_text.text("Founded: " + select.datum()['Founding Year']);
        loc_text.text( select.datum().Location);
      }

      function insigmouseoff(d, i) {
        // // Use D3 to select element, change color back to normal
        
        tooltip.style("visibility", "hidden");
      }


      var insigs = insig_group.selectAll("g")
      .data(d)
      .enter()
      .append('g')
      
      insigs.select('g')
      .data(d)
      .enter()
      .append('image')
      .style("z-index", "-1")
      .attr("x", function(d,i) {
        if (i<=7) {
        return 146*i+30;
      }
      else if (i>=8 && i<=15){
        return (146*i-1170+30);
      }
      else if (i>=16 && i<=23){
        return (146*i-2330+30);
      }
      else if (i>=24 && i<=32){
        return (146*i-3498+30);
      }
      else if (i>=33 && i<=39){
        return (146*i-4830+30);
      }
      
      })
      .attr("y", function(d,i) {
        if (i<=7) {
        return 20;
      }
      else if (i>=8 && i<=15){
        return 190;
      }

      else if (i>=16 && i<=23){
        return 370;
      }
      else if (i>=24 && i<=32){
        return 560;
      }

      else if (i>=33&& i<=39){
        return 710;
      }
      }
      )
      .attr("width", function(d) {
        if (d.index=="steel"){
          return "153px";
        }
        else if (d.index=="beemer"){
          return "153px";
        }
        else {
          return "124px";
        }
        })
      .attr("height", "124px")
      .attr("id", function(d) {  return (d.index)})
      .attr("href", function(d) { return "/"+ String(d.Insignia)})
      .on("mouseover", insigmouseover)
      .on("mouseout", insigmouseoff)





    }
    insig_render();