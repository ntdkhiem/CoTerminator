async function initializeMap(userPos) {
    // tracker-map is the id of the div where the map will appear
    var map = L
      .map('tracker-map')
      .setView([userPos.coords.latitude, userPos.coords.longitude], 10);   // center position + zoom
    
    // Add a tile to the map = a background. Comes from OpenStreetmap
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19,
        }).addTo(map);

    // Add a marker for user's location
    L.marker([userPos.coords.latitude, userPos.coords.longitude]).addTo(map)
      .bindPopup('You are here.')
      .openPopup();
    
    // Add a svg layer to the map
    L.svg().addTo(map);

    markers = await getData(userPos.coords.latitude, userPos.coords.longitude)

    // get highest and lowest cases for scaling purposes
    most_cases = -1
    least_cases = 0 

    markers.forEach(marker => {
      if (Math.max(most_cases, marker.confirmed) == marker.confirmed) {
        most_cases = marker.confirmed
      }
      else if (Math.min(least_cases, marker.confirmed) == marker.confirmed) {
        least_cases = marker.confirmed
      }
    })

    maxLength = Math.floor(Math.log10(most_cases))  // get total digits of the highest number of cases by county

    // Add a scale for bubble size
    var size = d3.scaleLinear()
      // .domain([least_cases, most_cases])  // What's in the data
      .domain([least_cases, most_cases])  // What's in the data
      .range([0, 100]) // size in pixel

    // create a tooltip
    var Tooltip = d3.select("#tracker-map")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        console.log('MouseOver')
      Tooltip.style("opacity", 1)
    }
    var mousemove = function(d) {
        console.log('MouseMove')
      Tooltip
        .html(d.confirmed + "<br>" + "new cases: " + d.new + "<br>" + "last updated: " + d.last_update)
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
        console.log('MouseLeave')
      Tooltip.style("opacity", 0)
    }

    // Select the svg area and add circles:
    d3.select("#tracker-map")
        .select("svg")
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
            .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
            .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
            .attr("r", function(d){ return size(d.confirmed) })
            .style("fill", "red")
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
            
    // Function that update circle position if something change
    function update() {
      d3.selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
    }

    // If the user change the map (zoom or drag), I update circle position:
    map.on("moveend", update)
}


async function getData(lat, lng) {
    // return a list of counties with infected covid cases based on given user's location
    let response = await fetch(`/api/covid?lat=${lat}&lng=${lng}`)
    let data = await response.json()
    
    if (data.hasOwnProperty('status')) {
        console.error(data.status)
        return [] 
    }
    // console.log(data)
    return data
}

// ask for user's location before start 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initializeMap)
}
else {
    alert('Geolocatino is not supported by this browser')
}