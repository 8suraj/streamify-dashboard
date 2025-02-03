import ReactECharts from 'echarts-for-react';
import staticData from '../../db.json';
import { formatNumber } from '../../lib/utils';

export default function UserGrowthChart({ className }: { className?: string }) {
	const months = staticData.userGrowth.map((item) => item.month);
	const totalUsers = staticData.userGrowth.map((item) => item.totalUsers);
	const activeUsers = staticData.userGrowth.map((item) => item.activeUsers);

	const option = {
		title: {
			text: 'User Growth Over the Last 12 Months',
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
				end: 100,
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

			data: months,
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
				formatter: formatNumber,
				width: 0,
			},
		},
		series: [
			{
				name: 'Total Users',
				type: 'line',
				smooth: true,
				showSymbol: false,

				data: totalUsers,
				lineStyle: {
					width: 3,
					color: '#1E90FF',
				},
				itemStyle: {
					color: '#1E90FF',
				},
			},
			{
				name: 'Active Users',
				type: 'line',
				smooth: true,
				showSymbol: false,
				data: activeUsers,
				lineStyle: {
					width: 3,
					color: '#32CD32',
				},
				itemStyle: {
					color: '#32CD32',
				},
			},
		],
	};

	return <ReactECharts option={option} className={className} />;
}
