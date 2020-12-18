// THIS CODE WAS INSPIRED BY CHRISTIAN MILNEIL AT: http://bl.ocks.org/vigorousnorth/e95a867b10de1239ab3a



var map_svg,
  width = 840,
  height =600;

var projection = d3.geo.equirectangular()
  .rotate([-10,0]).scale(height/1.5).translate([width / 4.8+1086, height / 3.5+380]).clipExtent([[.9,0.4],[width*1.2+500,height*1+150]]);

var path = d3.geo.path()
  .projection(projection);

var graticule = d3.geo.graticule();

var path = d3.geo.path()
  .projection(projection);
 
d3.json("data/countries-110m.json", function(error, world) {
console.log(world)

mappin = d3.select("#map")

mappin.attr("width","840px")
.attr("height", "600px")

  var map_svg = mappin.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("z-index", -1);
    
    map_svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

	
  map_svg.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path)
    .style("z-index", -1);

    map_svg.insert("path", ".graticule")
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
    .attr("class", "boundary")
    .attr("d", path)
    .style("z-index", -1);
		
  drawarcs(map_svg);

  d3.select(self.frameElement).style("height", height + "px");

});

// var tradedata = [
//     {
//       destination: {latitude: -23.3, longitude: 132.2},
//       name: 'Australia',
//       trade: 5
//     },{
//       destination: { latitude: -28.5, longitude: 24.7 },
//       name: 'South Africa',
//       trade : 6
//     },{
//       destination: { latitude: 31.7, longitude: 106.2 },
//       name: 'China',     
//       trade : 16
//     },{
//         destination: { latitude: 36.1, longitude: 127.7 },
//         name: 'S. Korea',
//         trade: 8
//     },{
//         destination: { latitude: 53.6, longitude: -2.3},
//         name: 'Great Britain',
//         trade: 12
//     },{
//         destination: { latitude: 61.2, longitude: 9.7144087 },
//         name: 'Norway',
//         trade: 2
//     },{
//         destination: { latitude: 61.6, longitude: 15.4 },
//         name: 'Sweden',
//         trade: 5
//     },{
//         destination: { latitude: 64.93, longitude: -19.02},
//         name: 'Iceland',
//         trade: 15
//     },{
//         destination: { latitude: 20.9, longitude: -101.5 },
//         name: 'Mexico',
//         trade: 15
//     },{
//         destination: { latitude: -14.0, longitude: -47.643501 },
//         name: 'Brazil',
//         trade: 12
//    },{
//         destination: {  latitude: 55.86, longitude: -112.1 },
//         name: 'Canada',
//         trade: 32
//     }
//   ];


  var tradedata = [
  {
    destination: {latitude: 18.257658 , longitude: -66.545348},
    name: 'Puerto Rico',
    trade: .03*3
  },{
    destination: { latitude:18.581575, longitude: -72.332314},
    name: 'Washington D.C.',
    trade : .03*3
  },{
    destination: { latitude: 46.565315, longitude: -66.461914 },
    name: 'New Brunswick',     
    trade : .03*3
  },{
      destination: { latitude: 44.681988, longitude: -63.744312},
      name: 'Nova Scotia',
      trade: .05*3
  },{
      destination: { latitude: 38.910831, longitude: -75.527672},
      name: 'Delaware',
      trade: .08*3
  },{
      destination: { latitude:45.236299 , longitude: -68.984793 },
      name: 'Maine',
      trade: .11*3
  },{
      destination: { latitude:38.810686 , longitude: -77.236239},
      name: 'Maryland',
      trade: .11*3
  },{
      destination: { latitude: 42.043457, longitude: -71.684123},
      name: 'Massachusetts',
      trade: .13*3
  },{
      destination: { latitude: 32.604712, longitude: -89.876402  },
      name: 'Mississippi',
      trade: .13*3
  },{
      destination: { latitude: 19.725342, longitude: -155.714808 },
      name: 'Hawaii',
      trade: .16*3
 },{
      destination: {  latitude:44.015754 , longitude:-71.559241 },
      name: 'New Hampshire',
      trade: .16*3
  },{
    destination: {  latitude: 33.639166 , longitude: -80.947674},
    name: 'South Carolina',
    trade: .16*3
},{
    destination: {  latitude: 38.940967, longitude:-80.181884  },
    name: 'West Virginia',
    trade: .16*3
},{
    destination: {  latitude: 32.605912, longitude: -86.680712},
    name: 'Alabama',
    trade: .22*3
},{
    destination: {  latitude: 54.727404, longitude: -68.439811},
    name: 'Quebec',
    trade: .24*3
},{
    destination: {  latitude: 41.502266, longitude: -72.757385},
    name: 'Connecticut',
    trade: .27*3
},{
    destination: {  latitude: 63.075664, longitude: -158.929331},
    name: 'Alaska',
    trade: .30*3
},{
    destination: {  latitude: 40.058323, longitude: -74.405663},
    name: 'New Jersey',
    trade: .32*3
},{
    destination: {  latitude: 43.804134, longitude: -120.554199},
    name: 'Oregon',
    trade: .46*3
},{
    destination: {  latitude: 37.839333, longitude: -84.270020},
    name: 'Kentucky',
    trade: .48*3
},{
    destination: {  latitude: 35.517490, longitude: -86.580444},
    name: 'Tennessee',
    trade: .48*3
},{
    destination: {  latitude: 30.984299, longitude: -91.962334},
    name: 'Louisiana',
    trade: .51*3
},{
    destination: {  latitude: 37.431572, longitude: -78.656891},
    name: 'Virginia',
    trade: .51*3
},{
    destination: {  latitude: 34.519939, longitude: -105.870087},
    name: 'New Mexico',
    trade: .57*3
},{
    destination: {  latitude: 51.253777, longitude: -85.323212},
    name: 'Ontario',
    trade: .57*3
},{
    destination: {  latitude: 32.165623, longitude: -82.900078},
    name: 'Georgia',
    trade: .62*3
},{
    destination: {  latitude: 38.802608, longitude: -116.419388},
    name: 'Nevada',
    trade: .65*3
},{
    destination: {  latitude: 53.726669, longitude: -127.647621},
    name: 'British Columbia',
    trade: .67*3
},{
    destination: {  latitude:35.759575, longitude: -79.019302},
    name: 'North Carolina',
    trade: .67*3
},{
    destination: {  latitude: 53.726669, longitude: -127.647621},
    name: 'Arkansas',
    trade: .73*3
},{
    destination: {  latitude: 40.712776, longitude: -74.005974},
    name: 'New York',
    trade: .73*3
},{
    destination: {  latitude: 41.203323, longitude: -77.194527},
    name: 'Pennsylvania',
    trade: .73*3
},{
  destination: {  latitude: 40.547970, longitude: -80.093689},
  name: 'Ohio',
  trade: .89*3
},{
  destination: {  latitude: 44.068203, longitude: -114.742043},
  name: 'Idaho',
  trade: .92*3
},{
  destination: {  latitude: 53.933270, longitude: -116.576508},
  name: 'Alberta',
  trade: .1*3
},{
  destination: {  latitude: 52.939915, longitude: -106.450867},
  name: 'Saskatchewan',
  trade: 1*3
}
,{
  destination: {  latitude: 27.664827, longitude: -81.515755},
  name: 'Florida',
  trade: 1.08*3
},{
  destination: {  latitude: 39.320980, longitude: -111.093735},
  name: 'Utah',
  trade: 1.16*3
}
,{
  destination: {  latitude: 35.007751, longitude: -97.092880},
  name: 'Oklahoma',
  trade: 1.18*3
},{
  destination: {  latitude: 40.267193, longitude: -86.134903},
  name: 'Indiana',
  trade: 1.27*3
},{
  destination: {  latitude: 53.760860, longitude: -98.813873},
  name: 'Manitoba',
  trade: 1.35*3
},{
  destination: {  latitude: 34.048927, longitude: -111.093735},
  name: 'Arizona',
  trade: 1.72*3
},{
  destination: {  latitude: 46.879681, longitude: -110.362564},
  name: 'Montana',
  trade: 2.02*3
}
,{
  destination: {  latitude: 39.011902, longitude: -98.484245},
  name: 'Kansas',
  trade: 2.05*3
},{
  destination: {  latitude: 37.964252, longitude: -91.831833},
  name: 'Missouri',
  trade: 2.10*3
},{
  destination: {  latitude: 37.964252, longitude: -91.831833},
  name: 'Missouri',
  trade: 2.10*3
},{
  destination: {  latitude: 47.751076, longitude: -120.740135},
  name: 'Washington',
  trade: 2.29*3
},{
  destination: {  latitude: 44.314842, longitude: -85.602364},
  name: 'Michigan',
  trade: 2.5*3
},{
  destination: {  latitude: 40.633125, longitude: -89.398529},
  name: 'Illinois',
  trade: 2.53*3
},{
  destination: {  latitude: 36.778259, longitude: -119.417931},
  name: 'California',
  trade: 2.58*3
},{
  destination: {  latitude: 31.968599, longitude: -99.901810},
  name: 'Texas',
  trade: 2.67*3
},{
  destination: {  latitude: 41.878002, longitude: -93.097702},
  name: 'Iowa',
  trade: 4.36*3
},{
  destination: {  latitude: 43.784439, longitude: -88.787865},
  name: 'Wisconsin',
  trade: 4.82*3
},{
  destination: {  latitude: 47.551495, longitude: -101.002014},
  name: 'North Dakota',
  trade: 4.98*3
},{
  destination: {  latitude: 43.075970, longitude: -107.290283},
  name: 'Wyoming',
  trade: 5.12*3
},{
  destination: {  latitude: 39.550053, longitude: -105.782066},
  name: 'Colorado',
  trade: 6.73*3
},{
  destination: {  latitude: 41.492538, longitude: -99.901810},
  name: 'Nebraska',
  trade: 7.75*3
},{
  destination: {  latitude: 46.729553, longitude: -94.685898},
  name: 'Minnesota',
  trade: 9.05*3
},{
  destination: {  latitude: 44.436138, longitude: -100.230499},
  name: 'South Dakota',
  trade: 12.92*3
}
];


  function drawarcs(map_svg) {

let tooltip2_width = 90;
let tooltip2_height = 40;

// now add the tooltip
let tooltip2 = d3.select("#map").append("g")
          .attr("class", "tooltip")
          .attr("visibility", "hidden")
          .style("z-index", 999);


tooltip2.append("rect")
  .attr("fill", "#F2F4F3")
  .attr("opacity", 1)
  .style("margin-left", "00px;")
  .attr("width", tooltip2_width)
  .attr("height", tooltip2_height);

//create the text box with info about the restuarant being hovered over
let percent_text = tooltip2.append("text")
  .attr("fill", "#0A0908")
  .attr("font-family", "'Noto Serif', serif")
  .attr("color", "#0A0908")
  .attr("font-weight", "700")
  .attr("font-size", "15px")
  .attr("text-anchor", "middle")
  // .attr("alignment-baseline", "hanging")
  .attr("x", tooltip2_width / 2.0)
  .attr("y", 5);


  function mapmouseover(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size

    tooltip2.style("visibility", "visible").style("z-index", 999);

    let select2 = d3.select(this)
    console.log(select2._groups[0][0].id)
    console.log( d3.event.pageX, d3.event.pageY)
    // percent_text.text(select2.datum().name);
    tooltip2.attr("top", "d3.event.pageY")
    tooltip2.attr("left", "d3.event.pageX")
    // tooltip2.attr("transform", "translate(" + (d3.event.pageX+600) + "," + (d3.event.pageY-6835) + ")");
    percent_text.text(String(select2._groups[0][0].id) + "%");
  }

  function mapmouseoff(d, i) {
    // // Use D3 to select element, change color back to normal
    
    tooltip2.style("visibility", "hidden");
  }

    var arcs = map_svg.append("g").selectAll('path.datamaps-arc').data( tradedata, JSON.stringify );
  
    arcs.enter()
      .append('path')
      .attr('class','arc')
      .attr("id", function(datum) {return String(datum.name)+":"+String(datum.trade.toFixed(2))})
      .style("z-index", -1)
      .on("mouseover", mapmouseover)
      .on("mouseoff", mapmouseoff)
      .attr('d', function(datum) {
        var origin = projection([-103.513283,44.412720]);
        var dest = projection([datum.destination.longitude, datum.destination.latitude]);
        var mid = [ (origin[0] + dest[0]) / 2, (origin[1] + dest[1]) / 2];
              
  
        //define handle points for Bezier curves. Higher values for curveoffset will generate more pronounced curves.
  
        var curveoffset = 20,
        midcurve = [mid[0]+curveoffset, mid[1]-curveoffset]
        // the scalar variable is used to scale the curve's derivative into a unit vector 
        scalar = Math.sqrt(Math.pow(dest[0],2) - 2*dest[0]*midcurve[0]+Math.pow(midcurve[0],2)+Math.pow(dest[1],2)-2*dest[1]*midcurve[1]+Math.pow(midcurve[1],2));
          
  
        // define the arrowpoint: the destination, minus a scaled tangent vector, minus an orthogonal vector scaled to the datum.trade variable
  
        arrowpoint = [ 
          dest[0] - ( 0.5*datum.trade*(dest[0]-midcurve[0]) - datum.trade*(dest[1]-midcurve[1]) ) / scalar , 
          dest[1] - ( 0.5*datum.trade*(dest[1]-midcurve[1]) - datum.trade*(-dest[0]+midcurve[0]) ) / scalar	
        ];
  
        // move cursor to origin
        return "M" + origin[0] + ',' + origin[1] 
        // smooth curve to offset midpoint
         + "S" + midcurve[0] + "," + midcurve[1]
        //smooth curve to destination	
         + "," + dest[0] + "," + dest[1]
        //straight line to arrowhead point
         + "L" + arrowpoint[0] + "," + arrowpoint[1] 
        // straight line towards original curve along scaled orthogonal vector (creates notched arrow head)
         + "l" + (0.3*datum.trade*(-dest[1]+midcurve[1])/scalar) + "," + (0.3*datum.trade*(dest[0]-midcurve[0])/scalar)
        // smooth curve to midpoint	
         + "S" + (midcurve[0]) + "," + (midcurve[1]) 
        //smooth curve to origin	
         + "," + origin[0] + "," + origin[1]
      });
      
    arcs.exit().transition()
        .style('opacity', 0)
        .remove();
  }