<template>
  {{data.map((el) => el.rn)}}
  {{data.map((el) => el.bn)}}
  {{data.map((el) => el.gn)}}
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      data: [],
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
