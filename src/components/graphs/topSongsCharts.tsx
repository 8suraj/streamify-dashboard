import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

// Mock function to simulate API response with dynamic top 5 songs
const fetchSongData = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const allSongs = [
				'Song A',
				'Song B',
				'Song C',
				'Song D',
				'Song E',
				'Song F',
				'Song G',
				'Song H',
				'Song I',
				'Song J',
			]; // More songs, only top 5 will be selected dynamically

			const data = {};
			for (let song of allSongs) {
				data[song] = [];
				for (let i = 30; i >= 0; i--) {
					const date = new Date();
					date.setDate(date.getDate() - i);
					data[song].push([
						date.toISOString().split('T')[0],
						Math.floor(Math.random() * 10000) + 500,
					]);
				}
			}
			resolve(data);
		}, 1000);
	});
};

// Helper function to format numbers as 1K, 10K, etc.
const formatNumber = (num) => {
	if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
	if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
	return num;
};

export default function TopStreamedSongsChart() {
	const [chartData, setChartData] = useState({});
	const [topSongs, setTopSongs] = useState([]);

	useEffect(() => {
		fetchSongData().then((data) => {
			// Calculate total streams for each song over 30 days
			const totalStreams = Object.entries(data).map(([song, values]) => ({
				song,
				total: values.reduce((sum, [, streams]) => sum + streams, 0), // Sum streams
			}));

			// Select the top 5 songs based on total streams
			const top5Songs = totalStreams
				.sort((a, b) => b.total - a.total) // Sort by highest streams
				.slice(0, 5) // Take the top 5
				.map((item) => item.song);

			setTopSongs(top5Songs);
			setChartData(data);
		});
	}, []);

	if (!topSongs.length) return <p>Loading chart data...</p>;

	// Extract dates from the first available song's data
	const dates = chartData[topSongs[0]].map((item) => item[0]);

	const option = {
		title: {
			text: 'Top 5 Most Streamed Songs (Last 30 Days)',
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
			top: 20,
			data: topSongs, // Only the top 5 songs
		},

		dataZoom: [
			{
				type: 'slider',
				start: 80,
				end: 100,
			},
			{
				type: 'inside',
			},
		],
		xAxis: {
			type: 'category',
			data: dates,
			boundaryGap: true,
			axisLine: { show: false },
			splitLine: { show: false },
			axisTick: { show: false },
		},
		yAxis: {
			type: 'value',
			name: '',
			axisLine: { show: false },
			splitLine: { show: false },
			axisTick: { show: false },

			axisLabel: {
				formatter: formatNumber, // Format Y-axis labels as 1K, 10K, etc.
			},
		},
		series: topSongs.map((song) => ({
			name: song,
			type: 'bar',
			stack: 'total',
			emphasis: {
				focus: 'series',
			},
			data: chartData[song].map((item) => item[1]), // Extract streams count
		})),
	};

	return <ReactECharts option={option} style={{ height: 400 }} />;
}
