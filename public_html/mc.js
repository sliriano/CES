let button = document.getElementById("submit");
let eco = document.getElementById("ecosystem");
let tb = document.getElementById("metricTable");
let metricMC = document.getElementById("mc");
let metricVol = document.getElementById("vol");
let metricVol24h = document.getElementById("vol24h");
let metricMc24h = document.getElementById("mc24h");

const ctx = document.getElementById('MarketCapChart').getContext('2d');
const contex = document.getElementById('VolumeChart').getContext('2d');
let MarketCapchart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});
let VolChart = new Chart(contex, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

button.addEventListener("click", function() {
  
	fetch("/mc", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({"ecosystem": eco.value}),
	})
  .then(function (response) {
		if (response.status == 200) {
			return response.json()
		}
	})
  .then(function (data) {
    console.log(data);
    // table data
    let mc = data.mc[data.mc.length-1];
    let volume = data.vol[data.vol.length-1];
    let vol24h = ((volume - data.vol[data.vol.length-6]) / data.vol[data.vol.length-6]) * 100;
    let mc24h = ((mc - data.mc[data.mc.length-6]) / data.mc[data.mc.length-6]) * 100;
    
    // format and put in table
    if (vol24h > 0) {
      metricVol24h.style.color = "green";
    } else if (vol24h < 0 ) {
      metricVol24h.style.color = "red";
    }
    if (mc24h > 0) {
      metricMc24h.style.color = "green";
    } else if (mc24h < 0 ) {
      metricMc24h.style.color = "red";
    }
    metricMC.innerText = "$" + (mc).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    metricMc24h.innerText = parseFloat(mc24h).toFixed(2)+"%";
    metricVol.innerText = "$" + (volume).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    metricVol24h.innerText = parseFloat(vol24h).toFixed(2) +"%";
    // Destory placeholder or old charts
    MarketCapchart.destroy()
    VolChart.destroy()
    // Display New Charts
    document.getElementById('MarketCapChart').style.display = "initial";
    document.getElementById('VolumeChart').style.display = "initial";
    // Display Metric Table
    tb.style.display = "initial";
    // Market Cap Chart
        MarketCapchart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: [{
                    label: data.econame +' Market Cap',
                    data: data.mc,
                    borderColor: 'rgba(30,144,255,1)',
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                plugins: {
                    zoom: {
                      zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true
                        },
                        mode: 'xy',
                      }
                    }
                  }
            }
        });
        // Volume Chart
        VolChart = new Chart(contex, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: [{
                    label: data.econame +' Volume',
                    data: data.vol,
                    borderColor: 'rgba(255, 159, 64, 1)',
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                plugins: {
                    zoom: {
                      zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true
                        },
                        mode: 'xy',
                      }
                    }
                  }
            }
        });

	})
  .catch(function (error) {
		console.log(error);
	});
});