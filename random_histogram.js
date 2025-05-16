// random_histogram.js
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Generate 1000 random numbers between 1 and 10
let data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10) + 1);

// Count the frequency of each number
let counts = Array(10).fill(0);
data.forEach(num => counts[num - 1]++);

// Create a bar chart
const width = 800;
const height = 600;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

(async () => {
  const config = {
    type: 'bar',
    data: {
      labels: [...Array(10).keys()].map(i => (i + 1).toString()),
      datasets: [{
        label: 'Frequência dos números aleatórios', // Label in Portuguese: Frequency of random numbers
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true } // Y-axis starts at 0
      }
    }
  };

  // Render the chart to an image buffer
  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  fs.writeFileSync('random_histogram.png', buffer);
  console.log('Histograma salvo como random_histogram.png'); // Chart saved message
})();