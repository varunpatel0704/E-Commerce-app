import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function BarChart({
  horizontal = false,
  title = "",
  labels = [],
  label1 = "",
  label2 = "",
  bgColor1 = "rgba(255, 99, 132, 0.5)",
  bgColor2 = "rgba(53, 162, 235, 0.5)",
  data1 = [],
  data2 = [],
}) {
  const options = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
        text: title,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels, //x-axis values-> common for both datasets
    datasets: [
      {
        label: label1,
        data: data1,
        backgroundColor: bgColor1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: label2,
        data: data2,
        backgroundColor: bgColor2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar width={horizontal?"200%":''} options={options} data={data} />;
}

export function DoughnutChart({
  labels=[],
  data=[],    // array of values
  bgColor=[], //individual color value for each value in repective order
  cutout=0,     // doughnut thickness
  offset=[],
  legend = true,
}) {
  const doughnutData = {
    labels,
    datasets:[{
      data,
      backgroundColor: bgColor,
      borderWidth: 0,
      offset,
    }]
  };
  const options = {
    responsive: true,
    plugins:{
      legend: {
        display: legend,
        postion: 'bottom'
      },
      labels:{
        padding: 40
      },
      title:{
        display:false,
      }
    },
    cutout,
  };

  return <Doughnut data={doughnutData} options={options} />;
}

export function PieChart({
  labels=[],
  data=[],    
  bgColor=[],
  offset,
}) {
  const pieChartData = {
    labels,
    datasets:[{
      data,
      backgroundColor: bgColor,
      borderWidth: 1,
      offset,
    }]
  };
  const options = {
    responsive: true,
    plugins:{
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={pieChartData} options={options} />;
}

export function LineChart1({
  labels = [],
  data=[],
  label='',
  bgColor='',
  borderColor='',
  fill = false,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineData = {    
    labels,
    datasets: [
      {
        fill,
        label,
        data,
        backgroundColor: bgColor,
        borderColor,
        borderWidth: 1.5,
      },      
    ],
  };

  return <Line options={options} data={lineData} />;
}

export function LineChart2({
  labels = [],
  data1=[],
  data2=[],
  label1='',
  label2='',
  bgColor1='',
  bgColor2='',
  borderColor1='',
  borderColor2='',
  fill = false,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineData = {    
    labels,
    datasets: [
      {
        fill,
        label: label1,
        data: data1,
        backgroundColor: bgColor1,
        borderColor: borderColor1,
        borderWidth: 1.5,
      },      
      {
        fill,
        label: label2,
        data: data2,
        backgroundColor: bgColor2,
        borderColor: borderColor2,
        borderWidth: 1.5,
      },      
    ],
  };

  return <Line options={options} data={lineData} />;
}