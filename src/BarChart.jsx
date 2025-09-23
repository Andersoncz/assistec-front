import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useState,useEffect } from 'react'



// Registrar os componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {

  const [arrServicosMensais, setArrServicosMensais] = useState([]);

  useEffect(() => {   
    const pegarApi = async () => {
      const response = await fetch("http://localhost:3000/servicos");
      const data = await response.json();
      setArrServicosMensais(data);
    };
    pegarApi();
  }, []);

  // labels vão ser os nomes
  const labels = arrServicosMensais.map(item => item.nome);

  const data = {
    labels, // eixo X
    datasets: [
      {
        label: 'SERVIÇOS ', // legenda
        data: arrServicosMensais.map(item => item.valor), // eixo Y
        backgroundColor: [
          'rgba(241, 16, 65, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'SERVIÇOS MENSAIS',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart






