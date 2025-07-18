// import React from 'react';

// const RevenueChart = ({ data }) => {
//   // Trouver la valeur maximale pour l'échelle
//   const maxValue = Math.max(...data.map(item => item.revenue), 1);
  
//   return (
//     <div className="flex items-end h-64 mt-8 space-x-1">
//       {data.map((day, index) => (
//         <div key={index} className="flex flex-col items-center flex-grow">
//           <div className="text-xs text-gray-500 mb-2">{day.day}</div>
//           <div 
//             className="w-full bg-orange-500 rounded-t-md transition-all duration-500"
//             style={{ 
//               height: `${(day.revenue / maxValue) * 100}%`,
//               backgroundColor: day.revenue > 0 ? '#ea580c' : '#e5e7eb'
//             }}
//           ></div>
//           <div className="text-xs mt-2">
//             {day.revenue > 0 ? `${(day.revenue/1000).toFixed(0)}K` : ''}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RevenueChart;





import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Enregistrer les composants nécessaires
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);
const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenu (FCFA)',
        data: data.values,
        backgroundColor: 'rgba(234, 88, 12, 0.7)',
        borderColor: 'rgba(234, 88, 12, 1)',
        borderWidth: 1
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenu mensuel'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value >= 1000 ? value/1000 + 'K' : value;
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default RevenueChart;