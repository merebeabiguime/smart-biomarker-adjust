import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper } from "@mui/material";
import { IBiomarkerMeasurementEntity } from "../Entities/IBiomarkerMeasurementEntity";
import { BiomarkerStatus } from "../store/types/TReceivedDataState";

interface BiomarkerChartProps {
  measurements: IBiomarkerMeasurementEntity[];
  status: BiomarkerStatus;
  recommendedDosage: number;
  thresholds: {
    low: number;
    medium: number;
    high: number;
  };
}

const BiomarkerChart: React.FC<BiomarkerChartProps> = ({
  measurements,
  status,
  recommendedDosage,
  thresholds,
}) => {
  const getColor = (value: number) => {
    if (value <= thresholds.low) return "green";
    if (value <= thresholds.medium) return "orange";
    return "red";
  };

  const data = measurements.map((m) => ({
    ...m,
    hour: new Date(m.hour).toLocaleTimeString(),
    color: getColor(m.value),
  }));

  // Assuming all measurements are for the same biomarker
  const biomarker = measurements[0]?.biomarker;

  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {biomarker?.name} ({biomarker?.measurementUnit})
      </Typography>
      <Typography variant="body2" gutterBottom>
        Status: {status}, Recommended Dosage: {recommendedDosage}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0]
                  .payload as IBiomarkerMeasurementEntity & { color: string };
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <p>Time: {new Date(data.hour).toLocaleTimeString()}</p>
                    <p>
                      Value: {data.value} {data.biomarker.measurementUnit}
                    </p>
                    <p>User ID: {data.userId}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={{
              stroke: "#8884d8",
              strokeWidth: 2,
              r: 4,
              fill: "#8884d8",
            }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BiomarkerChart;
