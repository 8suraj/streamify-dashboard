import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

// Mock function to simulate API response for user growth data
const fetchUserData = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = [];
			const startDate = new Date();
			startDate.setMonth(startDate.getMonth() - 11); // 12 months ago

			for (let i = 0; i < 12; i++) {
				const date = new Date(startDate);
				date.setMonth(date.getMonth() + i);

				data.push({
					month: date.toISOString().slice(0, 7), // YYYY-MM format
					totalUsers: Math.floor(Math.random() * 50000) + 50000, // 50K to 100K
					activeUsers: Math.floor(Math.random() * 30000) + 20000, // 20K to 50K
				});
			}
			resolve(data);
		}, 1000);
	});
};

// Helper function to format numbers (1K, 10K, etc.)
const formatNumber = (num) => {
	if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
	if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
	return num;
};

export default function UserGrowthChart({ className }) {
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		fetchUserData().then((data) => {
			setUserData(data);
		});
	}, []);

	if (!userData.length) return <p>Loading chart data...</p>;

	// Extract months for x-axis
	const months = userData.map((item) => item.month);
	const totalUsers = userData.map((item) => item.totalUsers);
	const activeUsers = userData.map((item) => item.activeUsers);

	const option = {
		title: {
			text: 'User Growth Over the Last 12 Months',
			left: 'center',
			show: false,
		},
		tooltip: {
			trigger: 'axis',
			formatter: (params) => {
				let tooltipContent = `<b>${params[0].axisValue}</b><br/>`;
				params.forEach((item) => {
					tooltipContent += `${item.marker} ${item.seriesName}: <b>${formatNumber(item.value)}</b><br/>`;
				});
				return tooltipContent;
			},
		},
		legend: {
			top: 0,
			icon: 'circle',
			data: ['Total Users', 'Active Users'],
		},
		grid: {
			left: '5%',
			right: '5%',
			top: '15%',
			bottom: '15%',
			containLabel: true,
		},

		dataZoom: [
			{
				type: 'slider',
				start: 0,
				end: 100, // Allow full view of the last 12 months
			},
			{
				type: 'inside',
			},
		],
		xAxis: {
			type: 'category',
			axisLine: { show: false },
			splitLine: { show: false },
			axisTick: { show: false },

			data: months, // Months dynamically fetched
			boundaryGap: false,
		},
		yAxis: {
			type: 'value',
			min: 'dataMin',
			max: 'dataMax',
			axisLine: { show: false },
			splitLine: { show: false },
			axisTick: { show: false },

			axisLabel: {
				formatter: formatNumber, // Format Y-axis labels
				width: 0,
			},
		},
		series: [
			{
				name: 'Total Users',
				type: 'line',
				smooth: true, // ✅ Curved line
				showSymbol: false,

				data: totalUsers,
				lineStyle: {
					width: 3,
					color: '#1E90FF', // 🔵 Custom Blue Color for Total Users
				},
				itemStyle: {
					color: '#1E90FF', // 🔵 Ensures the color is the same on hover
				},
			},
			{
				name: 'Active Users',
				type: 'line',
				smooth: true, // ✅ Curved line
				showSymbol: false,
				data: activeUsers,
				lineStyle: {
					width: 3,
					color: '#32CD32', // 🟢 Custom Green Color for Active Users
				},
				itemStyle: {
					color: '#32CD32', // 🟢 Ensures the color is the same on hover
				},
			},
		],
	};

	return <ReactECharts option={option} className={className} />;
}
