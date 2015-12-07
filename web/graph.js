window.onload = function() {
    $("#submit").click(function() {
        var metric = $('#metricSelect').val()
        var genre = $('#genreSelect').val()
        console.log(metric)
        console.log(genre)
        var graph = $('#graph').highcharts({
            chart: {
                type: 'spline',
                margin: [70, 50, 60, 80],
                events: {
                    click: function(e) {
                        // find the clicked values and the series
                        var x = e.xAxis[0].value,
                            y = e.yAxis[0].value,
                            series = this.series[0];

                        // Add it
                        series.addPoint([x, y]);
                    }
                }
            },
            title: {
                text: genre
            },
            subtitle: {
                align: 'left',
                text: 'Click the graph area to add a point. Click a point to remove it.'
            },
            xAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 1,
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 60,
                min: 0,
                max: 100
            },
            yAxis: {
                title: {
                    text: metric
                },
                minPadding: 0.2,
                maxPadding: 0.2,
                maxZoom: 60,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min: 0,
                max: 100
            },
            legend: {
                enabled: false
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbol: "",
                        menuItems: null,
                        text: "Generate Playlist",
                        onclick: function() {
                          var values = []
                          var lines = this.getCSV().split('\n');
                          for(var i = 1;i < lines.length;i++){
                            values.push(parseInt(lines[i].split(',')[1]))
                          }
                          cratePlaylist(genre, metric, values);
                        }
                    }
                }
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    point: {
                        events: {
                            'click': function() {
                                if (this.series.data.length > 1) {
                                    this.remove();
                                }
                            }
                        }
                    }
                }
            },
            series: [{
                data: [
                    [0, 0],
                    [90, 90]
                ]
            }]
        });
    });
};
