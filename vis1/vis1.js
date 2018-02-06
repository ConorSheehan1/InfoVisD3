window.onload = function() {
    //http://bl.ocks.org/weiglemc/6185069
    // create placeholder div to hold country name and move
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);    

    // globals
    var dataset;
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    var height = 700;
    var width = 1400;
    
    var inner_height = height - margin.top - margin.bottom;
    var inner_width = width - margin.left - margin.right;
    
    var button;
        
    //      http://colorbrewer2.org/#type=qualitative&scheme=Dark2&n=8
    //      rather than using colorbrewer I used the values provided in the slides
    //      https://dl.dropboxusercontent.com/content_link/qbQb6JlpCdtFkEdBL9gx5jyNmA4Fyx2KD90aQBsBUVr8cv1n3Ovlxcmw8ql14d5e/file        
    var regions = {"Asia":"#FF5558", "Europe": "#2B7E2C", "Africa": "#FFFC59", "North America": "#5959FF", "South America": "#986631", "Australia":"#FD57EF", "Central America": "#59FDFF", "Oceania": "#000000"};
    
    // select body for later use
    var body = d3.select(".body");
    var stop;
    var counter = -1;
    var switch_count = 0;
    var animation_time = 500;
    var legend_counter = 0;
    
    // Create SVG element
    body.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // select svg for later use
    var svg = d3.select("svg");
    
    // create legend
    var legend = d3.select(".legend")
    for(key in regions){
        
        legend.append("svg")
        .attr("width", 20)
        .attr("height", 20)
        .style("background", regions[key])
        .attr("class", key.replace(/\s+/g, "_"))
        .attr("count", 0)
        
        // function to show/hide regions on click of legend
        // include counter attribute for each legend to keep track of clicks
        .on("click",function(){ 
            var ths = d3.select(this);
            var cls = ths.attr("class");
            var cntr = ths.attr("count");
            var circles = d3.selectAll("." + cls.replace(/\s+/g, "_"));
            
            if(cntr==0){
                circles.style("opacity", "0.1");
                ths.attr("count", 1);
            } else{
                circles.style("opacity", "1.0");
                ths.attr("count", 0);
            }
        });
        
        // add text to legend
        legend.append("text")
        .text(" " + key);
        
        legend.append("br");
    }
    
    updateSlider = function(counter){
        // use property instead of attribute to get it to update!!
        // http://stackoverflow.com/questions/35631631/d3-js-selection-not-working
        d3.select("input[type=range]").property("value", counter);
        // can't use transition with property "/
    }
    
    // create axis
    getAxis = function(){
        // add labels
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2)
            .attr("y", height - 5)
            .text("$GDP per capita");
        
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("y", 5)
            .attr("x", -180)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("life expectancy (years)");
        
        // Create an x-axis connected to the x scale
    xAxis = d3.svg.axis()
        .scale(xScale)                        
                    .ticks(5)
                    .tickFormat(function (d) {
                        var prefix = d3.formatPrefix(d);
                        return prefix.scale(d) + prefix.symbol;
                    })
        .orient("bottom");

    //Define Y axis
    yAxis = d3.svg.axis()
                    .scale(yScale)
                    .ticks(10)
                    .orient("left");
            
    // Call the x-axis
    svg.append("g")
                .attr("class", "axis")
            
                .attr("transform", "translate(0," + inner_height + ")")
      .call(xAxis);
      
    // Call the y axis
    svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate (" + 50 + " 0)")
      .call(yAxis);
    }

    // main function to display circles
    getVis = function (year_data) {   
        //// find unique values for region
        // console.log(d3.map(year_data, function(d){return d.Region}).keys());
        
        // create axis every loop??
        getAxis();
        
        //create new circles
        var circles = svg.selectAll("circle")
        .data(year_data, function key(d){return d.Country;})
        
        //update (change existing circles)
        circles.transition().duration(animation_time)
        .attr("cx", function (d) {return xScale(+d.GDP)})
        .attr("cy", function (d) {return yScale(+d.LifeExp)})
        // map to area not radius!, pi*r**2 sqrt(r)/pi
        .attr("r", function (d) {return (Math.sqrt(+d.Population)/Math.PI)/200})
        .style("fill", function(d){return regions[d.Region]})
        .style("stroke", "black");
        
        //enter (need to add new circles because they don't exist yet)
        circles.enter()
        .append("circle")
        // replace spaces with underscores, for class name
        .attr("class", function(d){var str = d.Region; return str.replace(/\s+/g, "_")})
        .attr("r", 0)
        .transition().duration(1000).ease("bounce")
        .attr("cx", function (d) {return xScale(+d.GDP)})
        .attr("cy", function (d) {return yScale(+d.LifeExp)})
        
        // map population to area not radius!, pi*r**2 inv -> sqrt(r)/pi
        .attr("r", function (d) {return (Math.sqrt(+d.Population)/Math.PI)/200})
        
        .style("fill", function(d){return regions[d.Region]})
        .style("stroke", "black");
        
        //exit (remove circles that don't have data associated)
        circles.exit()
            .transition().duration(animation_time).attr("r", 0).style("opacity", "0")
            .remove(); 
         
        // add country names on mouseover
        //http://bl.ocks.org/weiglemc/6185069
        circles.on("mouseover", function(d) {
            // get legend with same class as current bubble
            var cnt = d3.selectAll("svg").filter("."+d3.select(this).attr("class")).attr("count");
            
            // only show country name if region is enabled (by chart legend)
            if(cnt == 0){                
              //highlight circle
              d3.select(this).transition().duration(10).style("stroke", "yellow");
              
              // set text to country 
              tooltip.html(d.Country)
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
            
              //show div
              tooltip.transition()
                   .duration(200)
                   .style("opacity", 1.0);
            }
          })
        
        circles.on("mouseout", function(d) {
              // unhighlight circle
              d3.select(this).transition().duration(10).style("stroke", "black");
            
              // hide div
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });
    }
    
    //https://www.dashingd3js.com/svg-text-element
    showYear = function(year_value){
        //remove old text
        svg.selectAll("text").remove();
        
        //add new text
        svg.selectAll("text")
        .data(year_value)
        .enter()
        .append("text")
        .attr("x", 60)
        .attr("y", 50)
        .text(year_value)
        .attr("font-family", "sans-serif")
        .attr("font-size", "50px")
        .attr("fill", "grey");
    }
    
    
    //http://learnjsdata.com/group_data.html
    //rather than filtering data every call, just group by year right at the start
    sort_data = function(data) {            
        return d3.nest()
              .key(function(d) { return d.Year})
              .entries(data);
    }
    
    // load csv (I'm leaving the console log here just in case the data doesn't load)
    d3.csv("../Gapminder_All_Time.csv", function (error, data) {
        if (error) {
            console.log("error loading csv")
        } else {
            console.log("data loaded", data);
            // group data by year
            dataset=sort_data(data);   
            
            // create scales
            xScale = d3.scale.log()
                  .domain([d3.min(data, function(d){return +d.GDP}), d3.max(data, function(d){return +d.GDP})])
            .range([margin.left, inner_width]);
            
            yScale = d3.scale.linear()
                  .domain([d3.min(data, function(d){return +d.LifeExp}), d3.max(data, function(d){return +d.LifeExp})])
            .range([inner_height, 20]);
            
            // function to step through values in dataset
            animate = function(){
                counter++;
                // wrap counter back to start
                // better than modulo I think
                if (counter >= dataset.length){
                    counter = 0;
                }
                // increment year value on canvas
                showYear(dataset[counter].key);
                // move circles
                getVis(dataset[counter].values);
                updateSlider(counter);
            }
            
            // function to toggle pause and play
            pause_play = function(){
                if (switch_count % 2 == 0){
                    stop = setInterval(animate, animation_time);
                    button.attr("value", "pause");
                }else {
                    clearInterval(stop);
                    button.attr("value", "play");
                }
                switch_count ++;
            };                
            
            // add line break before buttons so they're always below canvas
            body.append("br")
            
            // add pause/play button
            button = body.append("input")
                  .attr("type", "button")
                  .attr("value", "play")
                  .style("border-radius", "20px")
                  .style("background", "#50555C")
                  .style("color", "white")
                  .style("height", "23px")
                  .style("min-width", "60px")
                  .on("click", pause_play);
            
            // add a slider for years
           body.append("input")
              .attr("type", "range")
              .attr("min", -1)
              .attr("max", dataset.length-2)
              .attr("value", counter)
              .attr("id", "slider")
              // update counter (index value in csv), the call animate function to update chart
              .on("change", function() {counter = this.value; animate()});

            
            // create initial visualisation when page loads
            // showYear(dataset[counter].key)
            // getVis(dataset[counter].values);
            animate();
        }          
    });

};
