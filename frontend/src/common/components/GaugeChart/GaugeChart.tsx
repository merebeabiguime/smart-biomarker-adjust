import { Gauge } from "@mui/x-charts";
import React from "react";
import { TGaugeChartProps } from "./types/TGaugeChartProps";

export default function GaugeChart(props: TGaugeChartProps) {
  return (
    <div>
      <Gauge
        value={props.value}
        startAngle={0}
        endAngle={360}
        innerRadius="80%"
        outerRadius="100%"
        height={100}
        // ...
      />
    </div>
  );
}
