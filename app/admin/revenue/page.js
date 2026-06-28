"use client";
import React from 'react';
import Script from 'next/script';

export default function RevenuePage() {
  const initCharts = () => {
    if (!window.Chart) return;
    const primaryColor = '#173124';
    const primaryLightColor = '#b0cdbb';
    const surfaceVariantColor = '#e5e2e1';
    const fontFam = "'Plus Jakarta Sans', sans-serif";

    window.Chart.defaults.font.family = fontFam;
    window.Chart.defaults.color = '#424844';

    // Revenue Line Chart
    const revCanvas = document.getElementById('revenueChart');
    if (revCanvas) {
      const ctxRev = revCanvas.getContext('2d');
      // Destroy previous instance if it exists to avoid re-render bugs
      if (window.revenueChartInstance) {
        window.revenueChartInstance.destroy();
      }
      window.revenueChartInstance = new window.Chart(ctxRev, {
        type: 'line',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [{
            label: 'Revenue (₹)',
            data: [85000, 110000, 145000, 130000, 95000, 128400],
            borderColor: primaryColor,
            backgroundColor: 'rgba(23, 49, 36, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: primaryColor,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1c1b1b',
              padding: 12,
              titleFont: { size: 14, weight: '600' },
              bodyFont: { size: 14 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: surfaceVariantColor, drawBorder: false },
              ticks: { callback: function(value) { return '₹' + value/1000 + 'k'; } }
            },
            x: {
              grid: { display: false, drawBorder: false }
            }
          }
        }
      });
    }

    // Room-wise Bar Chart
    const roomCanvas = document.getElementById('roomChart');
    if (roomCanvas) {
      const ctxRoom = roomCanvas.getContext('2d');
      // Destroy previous instance if it exists to avoid re-render bugs
      if (window.roomChartInstance) {
        window.roomChartInstance.destroy();
      }
      window.roomChartInstance = new window.Chart(ctxRoom, {
        type: 'bar',
        data: {
          labels: ['Pine Suite', 'Valley View', 'Cedar Cottage', 'Oak Room'],
          datasets: [{
            label: 'Earnings',
            data: [45000, 32000, 28000, 23400],
            backgroundColor: [primaryColor, primaryLightColor, primaryLightColor, primaryLightColor],
            borderRadius: 4,
            barThickness: 32
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: surfaceVariantColor, drawBorder: false },
              ticks: { callback: function(value) { return '₹' + value/1000 + 'k'; } }
            },
            x: {
              grid: { display: false, drawBorder: false }
            }
          }
        }
      });
    }
  };

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" onLoad={initCharts} strategy="lazyOnload" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .ambient-shadow-1 { box-shadow: 0 4px 4px rgba(23, 49, 36, 0.02); }
        .ambient-shadow-2 { box-shadow: 0 12px 12px rgba(23, 49, 36, 0.05); }
      `}} />
      <div className="px-sm md:px-gutter max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <div className="mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
          <div>
            <h2 className="font-display-md text-display-md text-primary mb-2">Financial Overview</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Track your homestay's revenue performance and recent transactions.</p>
          </div>
          <div className="flex gap-sm">
            <button className="px-4 py-2 border border-outline rounded-lg text-primary font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>download</span> Export Report
            </button>
            <select className="px-4 py-2 bg-surface-container border-none rounded-lg text-primary font-label-md text-label-md focus:ring-1 focus:ring-primary cursor-pointer">
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
          {/* Total Earnings */}
          <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Total Earnings (YTD)</span>
              <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-1 rounded-md" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance_wallet</span>
            </div>
            <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹12,45,000</div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
              <span className="text-tertiary font-medium">+15.2%</span>
              <span className="text-on-surface-variant ml-1">vs last year</span>
            </div>
          </div>
          {/* Monthly Earnings */}
          <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Earnings This Month</span>
              <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-1 rounded-md" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
            </div>
            <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹1,28,400</div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>trending_down</span>
              <span className="text-secondary font-medium">-2.4%</span>
              <span className="text-on-surface-variant ml-1">vs last month</span>
            </div>
          </div>
          {/* Avg Booking Value */}
          <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
            <div className="flex justify-between items-start mb-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase">Avg. Booking Value</span>
              <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-1 rounded-md" style={{ fontVariationSettings: "'FILL' 0" }}>receipt_long</span>
            </div>
            <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹8,500</div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
              <span className="text-tertiary font-medium">+5.1%</span>
              <span className="text-on-surface-variant ml-1">vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-md mb-xl">
          {/* Revenue Line Chart */}
          <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-md">Revenue Over Time</h3>
            <div className="h-64 w-full relative">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
          {/* Room-wise Bar Chart */}
          <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-md">Earnings by Room</h3>
            <div className="h-64 w-full relative">
              <canvas id="roomChart"></canvas>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-surface rounded-xl ambient-shadow-1 border border-surface-variant overflow-hidden">
          <div className="p-md border-b border-surface-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Recent Transactions</h3>
            <a className="text-primary font-label-md text-label-md hover:underline" href="#">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-label-md text-label-md text-on-surface-variant border-b border-surface-variant">
                  <th className="py-3 px-md font-medium">Date</th>
                  <th className="py-3 px-md font-medium">Guest</th>
                  <th className="py-3 px-md font-medium">Room</th>
                  <th className="py-3 px-md font-medium text-right">Amount</th>
                  <th className="py-3 px-md font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface">
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-md">Oct 24, 2023</td>
                  <td className="py-4 px-md font-medium">Aarav Sharma</td>
                  <td className="py-4 px-md text-on-surface-variant">Pine Suite</td>
                  <td className="py-4 px-md text-right font-medium">₹12,000</td>
                  <td className="py-4 px-md text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">Paid</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant bg-surface-bright hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-md">Oct 22, 2023</td>
                  <td className="py-4 px-md font-medium">Elena Rostova</td>
                  <td className="py-4 px-md text-on-surface-variant">Valley View Room</td>
                  <td className="py-4 px-md text-right font-medium">₹8,500</td>
                  <td className="py-4 px-md text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">Paid</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-md">Oct 19, 2023</td>
                  <td className="py-4 px-md font-medium">Rohan Gupta</td>
                  <td className="py-4 px-md text-on-surface-variant">Cedar Cottage</td>
                  <td className="py-4 px-md text-right font-medium">₹15,000</td>
                  <td className="py-4 px-md text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-variant text-on-surface-variant">Pending</span>
                  </td>
                </tr>
                <tr className="border-b border-surface-variant bg-surface-bright hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-md">Oct 15, 2023</td>
                  <td className="py-4 px-md font-medium">Maya Patel</td>
                  <td className="py-4 px-md text-on-surface-variant">Pine Suite</td>
                  <td className="py-4 px-md text-right font-medium">-₹4,000</td>
                  <td className="py-4 px-md text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container">Refunded</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-md">Oct 12, 2023</td>
                  <td className="py-4 px-md font-medium">James Wilson</td>
                  <td className="py-4 px-md text-on-surface-variant">Oak Room</td>
                  <td className="py-4 px-md text-right font-medium">₹7,000</td>
                  <td className="py-4 px-md text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">Paid</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
