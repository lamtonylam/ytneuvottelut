import { Layoff } from './LayoffsTable';

export function getLayoffsByCompanyPerMonth(
  layoffs: Layoff[],
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};
  layoffs.forEach((layoff) => {
    const month = layoff.date.slice(0, 7); // YYYY-MM
    if (!result[layoff.company.companyName]) {
      result[layoff.company.companyName] = {};
    }
    result[layoff.company.companyName][month] =
      (result[layoff.company.companyName][month] || 0) + layoff.firedAmount;
  });
  return result;
}

export function getChartData(layoffs: Layoff[]) {
  const layoffsByCompanyPerMonth = getLayoffsByCompanyPerMonth(layoffs);
  const monthsSet = new Set<string>();
  layoffs.forEach((l) => monthsSet.add(l.date.slice(0, 7)));
  const months = Array.from(monthsSet).sort();

  const companyNames = Object.keys(layoffsByCompanyPerMonth);
  const colors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(199, 199, 199, 0.7)',
    'rgba(83, 102, 255, 0.7)',
    'rgba(255, 99, 255, 0.7)',
    'rgba(99, 255, 132, 0.7)',
    'rgba(0, 128, 128, 0.7)',
    'rgba(128, 0, 128, 0.7)',
    'rgba(128, 128, 0, 0.7)',
    'rgba(255, 0, 255, 0.7)',
    'rgba(0, 255, 255, 0.7)',
    'rgba(255, 255, 0, 0.7)',
    'rgba(0, 255, 0, 0.7)',
    'rgba(0, 0, 255, 0.7)',
    'rgba(255, 0, 0, 0.7)',
    'rgba(128, 0, 0, 0.7)',
    'rgba(0, 128, 0, 0.7)',
    'rgba(0, 0, 128, 0.7)',
    'rgba(192, 192, 192, 0.7)',
    'rgba(255, 215, 0, 0.7)',
    'rgba(0, 191, 255, 0.7)',
    'rgba(220, 20, 60, 0.7)',
    'rgba(34, 139, 34, 0.7)',
    'rgba(255, 140, 0, 0.7)',
    'rgba(106, 90, 205, 0.7)',
    'rgba(255, 20, 147, 0.7)',
  ];

  const datasets = companyNames.map((company, idx) => ({
    label: company,
    data: months.map((month) => layoffsByCompanyPerMonth[company][month] || 0),
    backgroundColor: colors[idx % colors.length],
    stack: 'companies',
  }));

  return {
    labels: months,
    datasets,
  };
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Layoffs by Company per Month',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};
