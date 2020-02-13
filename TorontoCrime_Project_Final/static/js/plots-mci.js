// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);
// //console.log("hi")

// -------------------------------------------------------------------

//const svg = d3.select('svg');
//const svgContainer = d3.select('#container');
    
const margin = 80;
const width = 1450 - 2 * margin;
const height = 630 - 2 * margin;

const svg = d3.select(".chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const chartGroup = svg.append('g')
  .attr('transform', `translate(${margin}, ${margin})`);

//starting counters for each crime
var Assault = 0;
var Auto_Theft = 0;
var Break_and_Enter = 0;
var Robbery = 0;
var Theft_Over = 0;

d3.csv("../../Resources/cleaned_dataframe.csv").then(function(data){
    data.forEach(function (row){
        if (row.MCI === "Assault"){
            ++Assault;
        }
        else if (row.MCI === "Auto Theft"){
            ++Auto_Theft;
        }
        else if (row.MCI === "Break and Enter"){
            ++Break_and_Enter;
        }
        else if (row.MCI === "Robbery"){
            ++Robbery;
        }
        else if (row.MCI === "Theft Over"){
            ++Theft_Over;
        }
        
        })

      // console.log(Assault);
      // console.log(Auto_Theft);
      // console.log(Break_and_Enter);
      // console.log(Robbery);
      // console.log(Theft_Over);
      
      const histogram = [
        {
          crime: 'Assault',
          value: Assault,
          color: '#000000'
        },
        {
          crime: 'Auto Theft',
          value: Auto_Theft,
          color: '#00a2ee'
        },
        {
          crime: 'Break and Enter',
          value: Break_and_Enter,
          color: '#fbcb39'
        },
        {
          crime: 'Robbery',
          value: Robbery,
          color: '#007bc8'
        },
        {
          crime: 'Theft Over',
          value: Theft_Over,
          color: '#65cedb'
        }
      ]


    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(histogram.map((h) => h.crime))
      .padding(0.3)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100000]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chartGroup.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chartGroup.append('g')
      .call(d3.axisLeft(yScale));

    // vertical grid lines
    // chartGroup.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(makeXLines()
    //     .tickSize(-height, 0, 0)
    //     .tickFormat('')
    //   )
    chartGroup.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chartGroup.selectAll()
      .data(histogram)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.crime))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 10)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.4)
          .attr('x', (a) => xScale(a.crime) - 5)
          .attr('width', xScale.bandwidth() + 50)

        const y = yScale(actual.value)

        line = chartGroup.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.crime) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.crime))
          .attr('width', xScale.bandwidth())

        chartGroup.selectAll('#limit').remove()
        chartGroup.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.crime) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 15)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin /6)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('No. of occurences')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.6)
      .attr('text-anchor', 'middle')
      .text('Crime Type')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 50)
      .attr('text-anchor', 'middle')
      .text('Major Crime Indicators (Toronto: 2014 to 2018)')

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin*2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: Toronto Police Service (Public Safety Data Portal)')


});


