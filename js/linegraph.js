// JavaScript for Sturgis Attendance line graph

// INSPIRATION CREDIT TO THE LINE GRAPH DEMO BY JEFF RZ IN INFO 3300 
// https://jeffrz.github.io/info3300-spr2020/notes/20.02.26.notes.htm 

// Distance Traveled Chart
var attendance_data_sddot;
var attendance_data_off;
const linesvg = d3.select("#sturgis_attendance");
const width2 = 700;
const height2 = 500;
const margin = { top: 10, right: 6, bottom: 50, left: 60 };
const lineWidth = width2 - margin.left - margin.right;
const lineHeight = height2 - margin.top - margin.bottom;
const annotations = linesvg.append("g").attr("id", "gridlines");
let linechart = linesvg.append("g").attr("id", "graphs")
  .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")");

const vis_sturgis_attendance = async function () {

// scales
  const yearExtent = [2010, 2020] 
  const yearScale = d3.scaleTime().domain(yearExtent).range([0, lineWidth-20]);
  
  const attendanceExtent = [200000, 1200000]
  const attendanceScale = d3.scaleLinear().domain(attendanceExtent).range([lineHeight, 0]);
  
  let leftAxis = d3.axisLeft(attendanceScale)
  let leftGridlines = d3.axisLeft(attendanceScale)
    .tickSize(-lineWidth + 12)
    .tickFormat("")
  
  annotations.append("g")
    .attr("class", "y1 axis")
    .attr("fill", "#5e513f")
    .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")")
    .call(leftAxis)
  
  annotations.append("g")
    .attr("class", "y1 gridlines")
    .attr("fill", "#a8927d")
    .attr("opacity", 0.45)
    .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")")
    .call(leftGridlines)
  
  annotations.append("text")
    .attr("transform", "translate(" + (10) + "," + (height2 / 2) + ")rotate(-90)")
    .style("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("stroke", "#49111c")
    .attr("fill", "#49111c")
    .text("# Attendees")
  
    var xAxisScale1 = d3.scaleTime()
    .domain([new Date(2010, 0, 1), new Date(2020, 0, 1)])
    .rangeRound([20,lineWidth ]);
    var xAxis1 = d3.axisBottom(xAxisScale1);
  
  let bottomAxis = d3.axisBottom(yearScale);
  let bottomGridlines = d3.axisBottom(yearScale)
    .tickSize(-lineHeight - 0)
    .tickFormat("");
  
  annotations.append("g")
    .attr("class", "x axis")
    .attr("fill", "#49111c")
    .attr("font-size", "12px")
    .attr("transform", "translate(" + (margin.left - 10) + "," + (lineHeight + margin.top) + ")")
    .call(xAxis1)
  
  // annotations.append("g")
  //   .attr("class", "x gridlines")
  //   .attr("fill", "#a8927d")
  //   .attr("stroke", "#a8927d")
  //   .attr("opacity", .45)
  //   .attr("transform", "translate(" + (margin.left + 10) + "," + (lineHeight + margin.top) + ")")
  //   .call(bottomGridlines)
  
  
  annotations.append("text")
  .attr("transform", "translate(" + (width2 / 2) + "," + (490) + ")")
  .style("text-anchor", "middle")
  .attr("font-size", "14px")
  .attr("stroke", "#49111c")
  .attr("fill", "#49111c")
  .text("Year")



  let date_parser = d3.timeParse("%Y-%m-%d")

  
  d3.json("data/attendance_official.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      // change all dates from strings to d3 datetime objects
      data[i]["Year"] = date_parser(data[i]["Year"])
      data[i]["Year"] = data[i]["Year"].getFullYear();
      data[i].Official = data[i].Official
    }
    console.log(data)
    attendance_data_off = data
    
  var lineGenerOfficial = d3.line()
  .x(d => yearScale(d["Year"]))
  .y(d => attendanceScale(d["Official"]));
  
  
    // line chart dist
    linesvg.append("path").datum(attendance_data_off)
    .attr("class", "line")
    .attr("data-legend", "Official")
    .attr("fill", "none")
    .attr("z-index", "0")
    .attr("stroke", "#6B0000")
    .attr("stroke-width", 3)
    .attr("opacity", 1)
    .attr("transform", "translate(" + (70) + "," + (10) + ")")
    .attr("d", lineGenerOfficial);
  
   // Add the line
   linesvg.selectAll("myCircles")
   .data(attendance_data_off)
   .enter()
   .append("circle")
     .attr("fill", "#6B0000")
     .attr("stroke", "none")
     .attr("transform", "translate(" + (70) + "," + (10) + ")")
     .attr("cx", function(d) { return yearScale(d.Year) })
     .attr("cy", function(d) { return attendanceScale(d.Official)})
     .attr("r", 4)
    
  
  });
  

  d3.json("data/attendance_sddot.json", function(data) {
    for (var i = 0; i < data.length; i++) {
  
  data[i]["Year"] = date_parser(data[i]["Year"])
  data[i]["Year"] = data[i]["Year"].getFullYear();
  data[i].Official = data[i].Official
        data[i].SDDOT = data[i].SDDOT
    }
  
  attendance_data_sddot = data
  
  var lineGenerSDDOT = d3.line()
    .x(d => yearScale(d["Year"]))
    .y(d => attendanceScale(d["SDDOT"]));
  
    // line chart dist
    linesvg.append("path").datum(attendance_data_sddot)
      .attr("class", "line")
      .attr("data-legend", "SDDOT")
      .attr("fill", "none")
    .attr("z-index", "0")
      .attr("stroke", "#a8927d")
      .attr("stroke-width", 3)
      .attr("opacity", 1)
      .attr("transform", "translate(" + (70) + "," + (10) + ")")
      .attr("d", lineGenerSDDOT);
  
  
   // Add the line
   linesvg.selectAll("myCircles_SDDOT")
   .data(attendance_data_sddot)
   .enter()
   .append("circle")
     .attr("fill", "#a8927d")
     .attr("stroke", "none")
     .attr("transform", "translate(" + (70) + "," + (10) + ")")
     .attr("cx", function(d) { return yearScale(d.Year) })
     .attr("cy", function(d) { return attendanceScale(d.SDDOT)})
     .attr("r", 4)
    
  

let linemouseGroup = linesvg.append("g")
.attr("z-index", 99);


let dist_label = linemouseGroup.append("text")
  .attr("id", "label")
  .attr("stroke", "black")
  .attr("fill", "black")
  .attr("opacity", 0)
  .attr("z-index", 99);

let dist_label2 = linemouseGroup.append("text")
  .attr("id", "label2")
  .attr("stroke", "black")
  .attr("fill", "black")
  .attr("opacity", 0)
  .attr("z-index", 99);

let valueline = linemouseGroup.append("line")
  .attr("y1", 0)
  .attr("y2", lineHeight)
  .attr("stroke", "#808080")
  .attr("stroke-width", 1)
  .attr("opacity", 0);


let valuemark = linemouseGroup.append("circle")
  .attr("id", "value")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("r", 10)
  .attr("opacity", 0);


let valuemark2 = linemouseGroup.append("circle")
  .attr("id", "value2")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("r", 10)
  .attr("opacity", 0);

let active = linemouseGroup.append("rect")
  .attr("id", "active")
  .attr("width", lineWidth)
  .attr("height", lineHeight)
  .attr("fill", "none")
  .attr("transform", "translate(" + (70) + "," + (10) + ")")
  .attr("pointer-events", "all");

active.on("mouseover", function () {
  valuemark.attr("opacity", 1).attr("transform", "translate(" + (70) + "," + (10) + ")");
  valuemark2.attr("opacity", 1).attr("transform", "translate(" + (70) + "," + (10) + ")");
  valueline.attr("opacity", 1).attr("transform", "translate(" + (70) + "," + (10) + ")");
  dist_label.attr("opacity", 1);
  dist_label2.attr("opacity", 1);
});

var i_string;
var i2;
var txt1;
var txt2;

  active.on("mousemove", function () {
    let mouse_loc = d3.mouse(this);
    let x = mouse_loc[0];
    let xyear = yearScale.invert(x);
    valueline.attr("x1", x).attr("x2", x);
    
    if (x > -3 && x<10) {
      i_string = 2010
      i2 = 0
      let d1 = attendance_data_sddot[i2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2)
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 53 && x < 74){
      i_string = 2011
      i2 = 1
      let d1 = attendance_data_sddot[i2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2)
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 108 && x < 120){
      i_string = 2012
      i2 = 2
      let d1 = attendance_data_off[i2];
      let xPos = yearScale(d1['Year']);
      let yPos = attendanceScale(d1["Official"]);
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     
      txt2 = "Official: " +  d1["Official"]

      dist_label.attr("opacity", 1);
    dist_label.text(txt2);
    if (xPos < lineWidth / 2.0) {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 176 && x < 190){
      i_string = 2013
      i2 = 3
      let d1 = attendance_data_sddot[i2-1];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 236 && x < 256){
      i_string = 2014
      i2 = 4
      let d1 = attendance_data_off[i2];
      let xPos = yearScale(d1['Year']);
      let yPos = attendanceScale(d1["Official"]);
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     
      txt2 = "Official: " +  d1["Official"]

      dist_label.attr("opacity", 1);
    dist_label.text(txt2);
    if (xPos < lineWidth / 2.0) {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 300 && x < 318){
      i_string = 2015
      i2 = 5
      let d1 = attendance_data_sddot[i2-2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 360 && x < 379){
      i_string = 2016
      i2 = 6
      let d1 = attendance_data_sddot[i2-2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 423 && x < 440){
      i_string = 2017
      i2 = 7
      let d1 = attendance_data_sddot[i2-2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 492 && x < 500){
      i_string = 2018
      i2 = 8
      let d1 = attendance_data_sddot[i2-2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 545 && x < 559){
      i_string = 2019
      i2 = 9
      let d1 = attendance_data_sddot[i2-2];
      let d2 = attendance_data_off[i2];
      let yPos2 = attendanceScale(d1["SDDOT"]);
      let xPos = yearScale(d2['Year']);
      let yPos = attendanceScale(d2["Official"]);

      valuemark.attr("cx", xPos).attr("cy", yPos2).attr("opacity", 1); 
      valuemark2.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     

      txt1 = "SDDOT: " +  d1["SDDOT"]
      txt2 = "Official: " +  d2["Official"]

      dist_label.attr("opacity", 1);
      dist_label2.attr("opacity", 1);

    dist_label.text(txt1);
    dist_label2.text(txt2);
    if (xPos < lineWidth / 2.0) {
        dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label.attr("x", xPos + 4).attr("y", yPos - 15).attr("text-anchor", "start");
      dist_label2.attr("x", xPos + 4).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else if (x > 608 && x < 620){
      i_string = 2020
      i2 = 10
      valuemark2.attr("opacity", 0);
      dist_label2.attr("opacity", 0);
      let d1 = attendance_data_sddot[i2-2];
      let xPos = yearScale(d1['Year']);
      let yPos = attendanceScale(d1["SDDOT"]);
      valuemark.attr("cx", xPos).attr("cy", yPos)
      .attr("opacity", 1);  // update the circles to the right position when the line is right over them
     
      txt1 = "SDDOT: " +  d1["SDDOT"]

      dist_label2.attr("opacity", 1);
    dist_label2.text(txt1);
    if (xPos < lineWidth / 2.0) {
      dist_label2.attr("x", xPos - 38).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    else {
      dist_label2.attr("x", xPos -38).attr("y", yPos - 33).attr("text-anchor", "start");
    }
    }
    else {
      i2 = 99;
      valuemark.attr("opacity",0);
      valuemark2.attr("opacity", 0);
      dist_label.attr("opacity", 0);
      dist_label2.attr("opacity", 0);
    }

  });
  

  
});


}
vis_sturgis_attendance();

