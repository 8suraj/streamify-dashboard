import ReactECharts from 'echarts-for-react';
import { MonthlyRevenue } from '../../lib/types';

export default function RevenueNightingaleChart({
	revenueData,
}: {
	revenueData: MonthlyRevenue;
}) {
	const chartData = [
		{ source: 'Subscriptions', value: revenueData.subscriptions },
		{ source: 'Ads', value: revenueData.ads },
		{ source: 'Sponsorships', value: revenueData.sponsorships },
		{ source: 'Affiliate', value: revenueData.affiliate },
	];
	const option = {
		title: {
			text: 'Revenue Distribution (Nightingale Chart)',
			left: 'center',
			show: false,
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b}: <b>{c}</b> ({d}%)',
		},
		legend: {
			bottom: 10,
			top: 0,
		},
		series: [
			{
				name: 'Revenue Sources',
				type: 'pie',
				radius: [20, 120],
				center: ['50%', '50%'],
				roseType: 'radius',
				data: chartData.map((item) => ({
					name: item.source,
					value: item.value,
				})),
				label: {
					formatter: '{b}: {d}%',
					color: 'auto',
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	};

	return (
		<ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
	);
}
