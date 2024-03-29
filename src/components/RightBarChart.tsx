import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ISequence } from "../@types/sequence";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function RightBarChart({ sessions }: { sessions: ISequence[] }) {
  let groupe: number = 0;
  let alone: number = 0;

  sessions.map((session) =>
    session.sessions.map((work) => {
      if (work.is_group_work) {
        return (groupe += work.time);
      }
      return (alone += work.time);
    })
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const labels = ["Groupe", "Individuel"];

  const data = {
    labels,
    datasets: [
      {
        label: "Groupe",
        data: [groupe, 0],
        backgroundColor: ["rgb(54, 162, 235, 0.2)"],
        borderColor: ["rgb(54, 162, 235)"],
        borderWidth: 1,
        barThickness: 80,
      },
      {
        label: "Individuel",
        data: [0, alone],
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
        barThickness: 80,
      },
    ],
  };

  const style = {
    maxWidth: "20%",
    maxHeight: "50vh",
    marginTop: "4rem",
  };

  return <Bar options={options} data={data} style={style} />;
}
