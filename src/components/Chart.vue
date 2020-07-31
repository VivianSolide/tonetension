<template>
  <div>
    <h1>Chart</h1>
    <svg width="500" height="270">
      <g style="transform: translate(0, 10px)">
        <path :d="lines.red" />
      </g>
    </svg>
    <svg width="500" height="270">
      <g style="transform: translate(0, 10px)">
        <path :d="lines.blue" />
      </g>
    </svg>
    <svg width="500" height="270">
      <g style="transform: translate(0, 10px)">
        <path :d="lines.green" />
      </g>
    </svg>
  </div>
</template>

<script>
import { onUpdated, reactive } from "vue";
import calculatePath from "../functions/calculatePath.js"

export default {
  name: "Chart",

  props: {
    red: {
      type: Array,
      default: () => {
        return [];
      },
    },
    blue: {
      type: Array,
      default: () => {
        return [];
      },
    },
    green: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  setup(props) {
    const colors = ["red", "blue", "green"];
    const lines = reactive({
      red: [],
      blue: [],
      green: [],
    });

    onUpdated(() => {
      const keys = Object.keys(props);
      const values = Object.values(props);
      for (const i in values) {
        lines[keys[i]] = calculatePath(values[i]);
      }
    });

    return {
      lines,
    };
  },
};
</script>