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
export default function calculatePath(figures) {
    const scale = getScales(figures);
    const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y((d) => scale.y(d));

    return path(figures);
}