import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import staticContent from '../../db.json';
import { formatNumber } from '../../lib/utils';

export default function TopStreamedSongsChart() {
	const [chartData, setChartData] = useState<
		Record<string, [string, number][]>
	>({});
	const [topSongs, setTopSongs] = useState<string[]>([]);

	useEffect(() => {
		const formattedData: Record<string, [string, number][]> = {};
		staticContent.songs.forEach((song) => {
			formattedData[song.name] = song.streams;
		});

		const totalStreams = staticContent.songs.map((song) => ({
			name: song.name,
			total: song.streams.reduce((sum, [, streams]) => sum + streams, 0),
		}));

		const top5Songs = totalStreams
			.sort((a, b) => b.total - a.total)
			.slice(0, 5)
			.map((item) => item.name);

		setTopSongs(top5Songs);
		setChartData(formattedData);
	}, []);

	if (!topSongs.length) return <p>Loading chart data...</p>;

	const dates = chartData[topSongs[0]].map((item) => item[0]);

	const option = {
		title: {
			text: 'Top 5 Most Streamed Songs (Last 30 Days)',
			left: 'center',
			show: false,
		},
		tooltip: {
			trigger: 'axis',
			formatter: (params: any) => {
				let tooltipContent = `<b>${params[0].axisValue}</b><br/>`;
				params.forEach((item: any) => {
					tooltipContent += `${item.marker} ${
						item.seriesName
					}: <b>${formatNumber(item.value)}</b><br/>`;
				});
				return tooltipContent;
			},
		},
		legend: {
			top: 20,
			data: topSongs,
		},
		dataZoom: [
			{
				type: 'slider',
				start: 0,
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
				formatter: formatNumber,
			},
		},
		series: topSongs.map((song) => ({
			name: song,
			type: 'bar',
			stack: 'total',
			emphasis: {
				focus: 'series',
			},
			data: chartData[song].map((item) => item[1]),
		})),
	};

	return <ReactECharts option={option} style={{ height: 400 }} />;
}
