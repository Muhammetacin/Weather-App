export let myChart = null;

export const drawGraph = (dayLabels, temperatureData) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    if(myChart != null) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dayLabels,
        datasets: [
          {
            label: "Temperature",
            data: temperatureData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
};