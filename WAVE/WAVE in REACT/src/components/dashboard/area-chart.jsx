import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js"
import { Line } from "react-chartjs-2"

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export function AreaChart({ title, data, labels, borderColor, backgroundColor }) {
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: title,
        data: data,
        borderColor: borderColor || "rgb(53, 162, 235)",
        backgroundColor: backgroundColor || "rgba(53, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}

