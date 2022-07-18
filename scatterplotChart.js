d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
.then(data => {
	
	const years = data.map(d => d.Year);
	const minutes = data.map(d => {
    let formatTime = d.Time.split(':')
		d.Time = new Date(1970, 0, 1, 0, formatTime[0], formatTime[1]);
	});
	
	const height = 400;
	const width = 800;
	const padding = 60;
	
	const xScale = d3.scaleLinear()
	   .domain([d3.min(years, d => d) + 1, d3.max(years, d => d) + 1])
	   .range([padding, width - padding])
	
	const yScale = d3.scaleTime()
	   .domain([0, d3.max(data, d => d.Time)])
	   .range([height - padding, padding])
	
	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);
	
	const svg = d3.select('#scatterplot-chart')
	   .append('svg')
	   .attr('height', height)
	   .attr('width', width)
	   .style('background', 'whitesmoke')
	
	const title = svg.append('text')
    .attr('id', 'title')
    .attr('x', (width/2) - padding)
	  .attr('y', 30)
    .text('Doping in Professional Cycling')
	
	svg.append('g')
	  .attr('id', 'x-axis')
	  .attr('transform', `translate(0, ${height-padding})`)
	  .call(xAxis)
	 
	svg.append('g')
	  .attr('id', 'y-axis')
	  .attr('transform', `translate(${padding}, 0)`)
	  .call(yAxis)
	  
	svg.selectAll('circles')
	   .data()
	   .enter()
	   .append('circles')
	   .attr('class', 'dot')
	   .attr('data-xvalue')
	   .attr('data-yvalue')
	
})


  
