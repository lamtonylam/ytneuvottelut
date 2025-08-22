import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    data: ChartData<"bar", number[], string>;
    options: ChartOptions<"bar">;
}

export default function LayoffsChart({ data, options }: ChartProps) {
    return (
        <div style={{ maxWidth: 700, marginBottom: "2rem" }}>
            <Bar data={data} options={options} />
        </div>
    );
}
