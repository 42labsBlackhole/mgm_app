<template>
  <div>
    <canvas id="statistics"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'DonutChart',
   data() {
    return {
      donutChartData: {
        type: "doughnut",
        data: {
          labels: ["Link", "Whatsapp", "Twitter"],
          datasets: [
            {
              data: [
                this.convertedStats.fromLink.length,
                this.convertedStats.fromWhatsapp.length,
                this.convertedStats.fromTwitter.length
              ],
              backgroundColor: ['#68019a','#25D366','#00acee'],
              borderColor: 'white',
              borderWidth: 2
          }]
        },
      options: {
        responsive: true,
      }
    }
  }
  },
  props: ['convertedStats'],
  mounted() {
    const ctx = document.getElementById('statistics');
    new Chart(ctx, this.donutChartData);
  }

}
</script>
