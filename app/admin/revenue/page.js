"use client";
import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Spinner } from '@/components/ui/spinner';

export default function RevenuePage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, roomsRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/rooms')
        ]);
        if (!bookingsRes.ok || !roomsRes.ok) throw new Error("Failed to load data");
        
        const bData = await bookingsRes.json();
        const rData = await roomsRes.json();
        
        setBookings(bData);
        setRooms(rData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 5000), 0);
  const avgBookingValue = bookings.length ? (totalRevenue / bookings.length).toFixed(0) : 0;
  
  const initCharts = () => {
    if (!window.Chart || loading || error) return;
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
      if (window.revenueChartInstance) {
        window.revenueChartInstance.destroy();
      }
      
      // Calculate revenue by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyRev = new Array(12).fill(0);
      bookings.forEach(b => {
        const d = new Date(b.createdAt || new Date());
        monthlyRev[d.getMonth()] += (b.totalPrice || 5000);
      });
      // Just showing last 6 months for demo
      const currentMonth = new Date().getMonth();
      const labels = [];
      const data = [];
      for (let i = 5; i >= 0; i--) {
        const mIndex = (currentMonth - i + 12) % 12;
        labels.push(months[mIndex]);
        data.push(monthlyRev[mIndex] || 0);
      }

      window.revenueChartInstance = new window.Chart(ctxRev, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue (₹)',
            data: data,
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
              ticks: { callback: function(value) { return '₹' + (value/1000).toFixed(1) + 'k'; } }
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
      if (window.roomChartInstance) {
        window.roomChartInstance.destroy();
      }
      
      const roomEarnings = {};
      rooms.forEach(r => roomEarnings[r._id || r.id || r.title] = { title: r.title, earnings: 0 });
      bookings.forEach(b => {
        const rid = b.roomId || b.room;
        if (roomEarnings[rid]) {
          roomEarnings[rid].earnings += (b.totalPrice || 5000);
        } else if (roomEarnings[b.roomId]) {
          roomEarnings[b.roomId].earnings += (b.totalPrice || 5000);
        }
      });
      
      const roomLabels = [];
      const roomData = [];
      Object.values(roomEarnings).forEach(r => {
        roomLabels.push(r.title);
        roomData.push(r.earnings);
      });

      window.roomChartInstance = new window.Chart(ctxRoom, {
        type: 'bar',
        data: {
          labels: roomLabels.length ? roomLabels : ['Pine Suite', 'Valley View', 'Cedar Cottage', 'Oak Room'],
          datasets: [{
            label: 'Earnings',
            data: roomData.length ? roomData : [45000, 32000, 28000, 23400],
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
              ticks: { callback: function(value) { return '₹' + (value/1000).toFixed(1) + 'k'; } }
            },
            x: {
              grid: { display: false, drawBorder: false }
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      setTimeout(initCharts, 100);
    }
  }, [loading, error, bookings, rooms]);

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

        {loading ? (
          <div className="flex justify-center py-12"><Spinner className="text-primary w-8 h-8" /></div>
        ) : error ? (
          <div className="text-center py-12 text-error">{error}</div>
        ) : (
          <>
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
              {/* Total Earnings */}
              <div className="bg-surface rounded-xl p-md ambient-shadow-1 border border-surface-variant">
                <div className="flex justify-between items-start mb-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase">Total Earnings (YTD)</span>
                  <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-1 rounded-md" style={{ fontVariationSettings: "'FILL' 0" }}>account_balance_wallet</span>
                </div>
                <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹{totalRevenue.toLocaleString('en-IN')}</div>
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
                <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹{(totalRevenue * 0.3).toLocaleString('en-IN')}</div>
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
                <div className="font-display-md text-[40px] leading-tight text-primary mb-2">₹{Number(avgBookingValue).toLocaleString('en-IN')}</div>
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
                    {bookings.slice(0, 5).map((b, i) => {
                      const amount = b.totalPrice || 5000;
                      const roomTitle = rooms.find(r => (r._id || r.id) === b.roomId || r.title === b.roomId)?.title || b.roomId || 'Unknown Room';
                      const date = new Date(b.createdAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      return (
                        <tr key={b._id || i} className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                          <td className="py-4 px-md">{date}</td>
                          <td className="py-4 px-md font-medium">{b.user}</td>
                          <td className="py-4 px-md text-on-surface-variant">{roomTitle}</td>
                          <td className="py-4 px-md text-right font-medium">₹{amount.toLocaleString('en-IN')}</td>
                          <td className="py-4 px-md text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant">{b.status || 'Paid'}</span>
                          </td>
                        </tr>
                      );
                    })}
                    {bookings.length === 0 && (
                      <tr><td colSpan="5" className="py-4 px-md text-center text-on-surface-variant">No transactions found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
