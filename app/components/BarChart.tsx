"use client";

// Install dependencies: chart.js and react-chartjs-2
// npm install chart.js react-chartjs-2

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js";
import type { ChartData } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Props = {
  ervenyes: number;
  ervenytelen: number;
};

export default function BarChart({ ervenyes, ervenytelen }: Props) {
  
  // Bar chart konfiguráció
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
  };

  // Ábrázolandó adatok a bar chart-hoz
  const data: ChartData<"bar", number[], string> = {
    labels: ["Érvényes felszállás", "Érvénytelen felszállás"],
    datasets: [
      {
        data: [ervenyes, ervenytelen],
        backgroundColor: [
          "rgb(34,197,94)", // zöld
          "rgb(239,68,68)", // piros
        ],
      },
    ],
  };

  return (
    <div style={{ width: "600px", marginTop: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
