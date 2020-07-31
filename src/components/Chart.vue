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
import * as d3 from "d3";

function getScales(figures) {
  const x = d3.scaleTime().range([0, 255]);
  const y = d3.scaleLinear().range([210, 0]);
  d3.axisLeft().scale(x);
  d3.axisBottom().scale(y);
  x.domain(d3.extent(figures, (d, i) => i));
  y.domain([0, d3.max(figures, (d) => d)]);

  return {
    x,
    y,
  };
}

function calculatePath(figures) {
  const scale = getScales(figures);
  const path = d3
    .line()
    .x((d, i) => scale.x(i))
    .y((d) => scale.y(d));

  return path(figures);
}

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