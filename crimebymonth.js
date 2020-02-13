var years = [2014.0, 2015.0, 2016.0, 2017.0, 2018.0]

Plotly.d3.csv('crimecount.csv', (err, rows) => {
  var data = years.map(y => {
    var d = rows.filter(r => r.occurrenceyear == y)

    return {
      type: 'bar',
      name: y,
      x: d.map(r => r.occurrencemonth),
      y: d.map(r => r.count)
    }
  })

  Plotly.newPlot('graph', data)
})