import ReactECharts from 'echarts-for-react';
export interface MicroLineChartProps {
	time: number | string;
	value: number;
}
const MicroLineChart = ({ data }: { data: MicroLineChartProps[] }) => {
	const options = {
		xAxis: {
			type: 'time',
			axisLabel: { show: false },
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
		},
		yAxis: {
			type: 'value',
			axisLabel: { show: false },
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
			min: 'dataMin',
			max: 'dataMax',
		},
		series: [
			{
				data: data.map((item) => [item.time, item.value]),
				type: 'line',
				smooth: true,
				lineStyle: {
					color: '#ee5d19',
					width: 2,
				},
				symbol: 'none',
			},
		],
		grid: {
			left: 0,
			right: 0,
			top: 1,
			bottom: 1,
			containLabel: false,
		},
	};

	return (
		<ReactECharts option={options} style={{ width: '100%', height: '100%' }} />
	);
};

export default MicroLineChart;
