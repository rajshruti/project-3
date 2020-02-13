var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

Plotly.d3.csv('/Resources/crime_byhour.csv', (err, rows) => {
  var data = days.map(y => {
    var d = rows.filter(r => r.occurrencedayofweek == y)
    return {
      type: 'bar',
      name: y,
      x: d.map(r => r.occurrencehour),
      y: d.map(r => r.count)
		}
	})
	
	var layout = {
    title: "Crime By Hour",
    xaxis: { title: "Hour of the day" },
    yaxis: { title: "Crime Count" }
	};
	
	Plotly.newPlot('graph', data, layout)
})