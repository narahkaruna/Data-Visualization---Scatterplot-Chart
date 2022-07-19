d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
.then(data => {
	
	const years = data.map(d => new Date(d.Year));
	const  formatTime= "%M:%S";
	const parsedTime = data.map(d => {
    	return d3.timeParse(formatTime)(d.Time);
	});

	const height = 400;
	const width = 800;
	const padding = 60;
	
	const xScale = d3.scaleLinear()
	   .domain([d3.min(data, d => d.Year) + 1, d3.max(data, d => d.Year) + 1])
	   .range([padding, width - padding])
	
	const yScale = d3.scaleTime()
	   .domain([d3.min(parsedTime, d => d), d3.max(parsedTime, d => d)])
	   .range([height - padding, padding])
	
	const xAxis = d3.axisBottom(xScale);

	const yAxis = d3.axisLeft(yScale)
	   .tickFormat(d => d3.timeFormat(formatTime)(d))
	
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
	   .data(data)
	   .enter()
	   .append('circles')
	   .attr('class', 'dot')
	   .attr('cx', (d, i) => years[i])
	   .attr('cy', (d, i) => minutes[i])
	   .attr('r', 5)
	
})


  
