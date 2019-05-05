window.onload = function(){

    // https://datamaps.github.io/
    // https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
    var counter = -1;
    var animation_time = 500;
    var dataset;
    var gov_types;
    var colors;
    var switch_count = 0;
    var updateCounter = 0;
    var datasrc;
    var body = d3.select("body");
    var controls = d3.select(".controls");

    //from notes
    var margin = {top: 10, right: 20, bottom: 25, left: 250};

    //Width and height
    var outer_width = 1500;
    var outer_height = 300;
    var svg_width = outer_width - margin.left - margin.right;
    var svg_height = outer_height - margin.top - margin.bottom;

    var xScale;
    var yScale;
    var xAxis;
    var yAxis;

    // create datamap
    var map = new Datamap({element: document.getElementById('map-container'), fills: {defaultFill: "#FFFFFF"},
                           geographyConfig: {highlightFillColor: '#000000', borderColor: '#000000'}});

    // empty global object to hold color for each government type
    var defaultData = {};
    var codes = country_codes;

    // group data by year
    sort_data = function(data) {
        return d3.nest()
              .key(function(d) {return d.Year})
              .entries(data);
    }

    // handle wrapping data back to start
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
        getBarChart(dataset[counter].values);
        updateSlider(counter);
    }

    // display year on svg
    showYear = function(year_value){
        var year = d3.select("#year");
        year.text(year_value)
    }

    // update colors on map to represent government type
    // they don't really change "/
    getVis = function(year_data){

        // reset all values in default data to white
        // country should be white if it's not in the dataset
        for (val in defaultData){
            defaultData[val] = "#FFFFFF";
        }

        // assign color value for each country to defaultData
        for (i in year_data){
                var gov = year_data[i].Government
                var countryx = codes[year_data[i].Country];
                var colorx = colors[gov_types.indexOf(gov)];
                defaultData[countryx] = colorx;

                // format governements so they're valid classes
                gov = gov.replace(/\s+/g, '_').replace(/'/g, "");

                // give every country a government type id
                d3.select(".datamaps-subunit."+countryx).attr("id", gov);
            }
        map.updateChoropleth(defaultData);
    }

    // code adapted from notes
    function getBarChart(year_data){

        // get average gdp per governemnt type
        year_data = d3.nest()
          .key(function(d) { return d.Government; })
          .rollup(function(v) { return d3.mean(v, function(d) { return d.GDP; }); })
          .entries(year_data);
        // key is now governement type, values is average GDP


        // Update the domain of the x scale
        yScale.domain(year_data.map(function(d) { return d.key; }));

        // Call the y-axis
        svg.select("#y-axis").call(yAxis);

        /******** PERFORM DATA JOIN ************/
          // Join new data with old elements, if any.
          var bars =  svg.selectAll("rect")
           .data(year_data, function key(d) {
              return d.key;
          });

        /******** HANDLE UPDATE SELECTION ************/
          // Update the display of existing elelemnts to match new data
          bars.transition()
                    .attr("gov", function(d){return d.key})
            .duration(animation_time)
            .attr("x", 2)
           .attr("y", function(d) {
              return yScale(d.key) ;
           })
           .attr("width", function(d) {return xScale(+d.values)})
           .attr("height", yScale.rangeBand())

           .style("fill", function(d){return colors[gov_types.indexOf(d.key)]});


            // abandon hope ye who enter here
            bars.enter()
           .append("rect")

            //make gov a valid class replace space with underscore and remove apostrophe
            .attr("gov", function(d){return d.key.replace(/\s+/g, '_').replace(/'/g, "")})
           .attr("x", 2)
           .attr("y", function(d) {
              return yScale(d.key) ;
           })
           .attr("width", function(d) {return xScale(+d.values)})
           .attr("height", yScale.rangeBand())
           .style("fill", function(d){return colors[gov_types.indexOf(d.key)]});

          /******** HANDLE EXIT SELECTION ************/
          // Remove bars that not longer have a matching data eleement
          bars.exit().remove();


          //on mousover show coutries with that government type
          bars.on("mouseover", function(d) {
              d3.select(this).attr("opacity", 0.5);

              var gov = d3.select(this).attr("gov");
              gov = gov.replace(/\s+/g, '_').replace(/'/g, "");

              // this selector took 1 million years
              d3.selectAll(".datamaps-subunits > path:not(#"+gov + ")").attr("opacity", 0.2);
          })

          bars.on("mouseout", function(d) {
              // get legend with same class as current bubble
              d3.select(this).attr("opacity", 1.0);

              var gov = d3.select(this).attr("gov");
              gov = gov.replace(/\s+/g, '_').replace(/'/g, "");

              // put opacity back to normal
              d3.selectAll(".datamaps-subunits > path:not(#"+gov + ")").attr("opacity", 1.0);
          })
      }

      updateSlider = function(counter){
          // use property instead of attribute to get it to update!!
          // http://stackoverflow.com/questions/35631631/d3-js-selection-not-working
          d3.select("input[type=range]").property("value", counter);
          // can't use transition with property "/
      }

      // switch between two datasets
      update_data = function(){
          console.log(updateCounter);

          if(updateCounter%2==0){
              datasrc = "/data/Gapminder_All_Time.csv";
          }else{
              datasrc = "/data/governments_grouped.csv";
          }

          d3.csv(datasrc, function (error, data){
              console.log(datasrc);
              if (error) {
                  console.log("error loading csv")
              } else {
                  console.log("data loaded", data);
                  dataset=sort_data(data);
                  gov_types = d3.map(dataset[0].values, function(d){return d.Government}).keys();
                  updateCounter++;
              }
              // call animate to load first value, reduce counter by one to account for animate incrementing it
              // in otherwords, stay on the same year when changing datasets
              counter--;
              animate();
          });
      }

      // load csv first time page loads
      d3.csv("/data/governments_grouped.csv", function (error, data){
          if (error) {
              console.log("error loading csv")
          } else {
              console.log("data loaded", data);

              // group data by year
              dataset=sort_data(data);

              // get every country
              // console.log(JSON.stringify(d3.map(dataset[0].values, function(d){return d.Country}).keys()));

              // get every government type
              gov_types = d3.map(dataset[0].values, function(d){return d.Government}).keys();

              // theres simply too many categories in the dataset to represent well with color. Using a texture probably wouldn't help much either.
              // I tried to use the scale provided in class and then invert colors to get more values.
              // Mousing over the barchart will drop opacity for every region with a government type other than the currently selected one.
              colors = ["#2B7E2C", "#FF5558", "#FFFC59", "#5959FF", "#FD57EF", "#986631", "#59FDFF", "#000000",
                        "#00AAA7", "#D481D3", "#0003A6", "#A6A600", "#6799CE", "#02A810", "#A60200", "#151500", "#999966"];

              // play pause button function
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

              // add svg for barchart
              //Create SVG element as a group with the margins transform applied to it
               body.append("br")
               svg = d3.select("#barchart")
                      .append("svg")
                      .attr("width", svg_width + margin.left + margin.right)
                      .attr("height", svg_height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              // add text for year
              d3.select("#map-container svg").append("text").attr("id", "year").attr("x", 5).attr("y", 350)
              .attr("font-family", "sans-serif").attr("font-size", "50px").attr("fill", "grey");

              // stuff for barchart
              //create scales
              xScale = d3.scale.linear()
//                                     .domain([d3.min(data, function(d){return +d.GDP}), d3.max(data, function(d){return +d.GDP})])
//                                      doesn't get close to actual max due to average by government
                                      .domain([0, 80000])
                                   .range([0, svg_width/2]);

              yScale = d3.scale.ordinal()
                          .rangeRoundBands([svg_height, 0], 0.1);

              //Define Y axis
              yAxis = d3.svg.axis()
                                .scale(yScale)
                                .ticks(5)
                                .orient("left");

              // Create an x-axis connected to the x scale
              xAxis = d3.svg.axis()
                           .scale(xScale)
                          .tickFormat(function (d) {
                                      var prefix = d3.formatPrefix(d);
                                      return prefix.scale(d) + prefix.symbol;})
                           .orient("bottom");

              // Call the y axis
              svg.append("g")
                  .attr("class", "axis")
                  .attr("id", "x-axis")
                  .call(xAxis)
                  .attr("transform", "translate(0," + svg_height + ")");

              // All but call the x-axis
              svg.append("g")
                  .attr("class", "axis")
                  .attr("id", "y-axis");

              //x axis label
              svg.append("text")
              .attr("text-anchor", "end")
              .attr("x", svg_width/2)
              .attr("y", svg_height - 5)
              .text("Average GDP");

              //y axis label
              svg.append("text")
              .attr("text-anchor", "end")
              .attr("y", -240)
              .attr("x", -60)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("Government type");


              // add pause/play button
              body.append("br")
              button = controls.append("input")
                    .attr("type", "button")
                    .attr("value", "play")
                    .style("border-radius", "20px")
                    .style("background", "#50555C")
                    .style("color", "white")
                    .style("height", "23px")
                    .style("min-width", "60px")
                    .on("click", pause_play);

              // add a slider for years
              controls.append("input")
                .attr("type", "range")
                .attr("min", -1)
                .attr("max", dataset.length-2)
                .attr("value", counter)
                // update counter (index value in csv), the call animate function to update chart
                .on("change", function() {counter = this.value; animate()});


              updateButton = controls.append("input")
                    .attr("type", "button")
                    .attr("value", "change data")
                    .style("border-radius", "20px")
                    .style("background", "#50555C")
                    .style("color", "white")
                    .style("height", "23px")
                    .style("min-width", "60px")
                    .on("click", update_data);

          //show first value by default
          animate();
          }
      });
}
