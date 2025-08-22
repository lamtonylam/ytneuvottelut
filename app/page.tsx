'use client';
import LayoffsChart from './LayoffsChart';
import LayoffsTable, { Layoff } from './LayoffsTable';
import { getChartData, chartOptions } from './utils';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [layoffs, setLayoffs] = useState<Layoff[]>([]);

  useEffect(() => {
    fetch('/api/layoffs', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setLayoffs(data));
  }, []);

  const chartData = getChartData(layoffs);

  return (
      <main
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
      <h1
        style={{
          fontFamily: 'Roboto, Arial, sans-serif',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Finnish Tech Layoffs Tracker
      </h1>
      {layoffs.length > 0 && (
        <>
          <LayoffsChart data={chartData} options={chartOptions} />
          <LayoffsTable layoffs={layoffs} />
        </>
      )}
    </main>
  );
}
