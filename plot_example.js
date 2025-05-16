// plot_example.js
const { ChartJSNodeCanvas: PlotChart } = require('chartjs-node-canvas');
const fs2 = require('fs');

const plotCanvas = new PlotChart({ width: 800, height: 600 });

(async () => {
  // Generate x values from 0 to 10 (step 0.1)
  const x = Array.from({ length: 100 }, (_, i) => i / 10);
  // Calculate sine of each x
  const y = x.map(v => Math.sin(v));

  const config = {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: 'Seno(x)', // Label in Portuguese: Sine(x)
        data: y,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1 // Curve tension
      }]
    },
    options: {
      scales: {
        x: { type: 'linear', position: 'bottom' } // X-axis as linear scale
      }
    }
  };

  // Render the chart and save as PNG
  const buffer = await plotCanvas.renderToBuffer(config);
  fs2.writeFileSync('plot_example.png', buffer);
  console.log('Gráfico salvo como plot_example.png'); // Chart saved message
})();
