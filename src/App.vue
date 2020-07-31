<template>
  <div>
    <Chart
      :red="data.map(el => el.rn)"
      :blue="data.map(el => el.bn)"
      :green="data.map(el => el.gn)"
    />
  </div>
</template>

<script>
import Chart from "./components/Chart.vue";
export default {
  name: "App",
  components: {
    Chart,
  },
  data() {
    return {
      data: [],
      red: [],
      blue: [],
      green: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await fetch(
        "https://v2-api.sheety.co/612035a23ef10236acde20367e8a78e8/toneTension/5"
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.data = res[5];
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
