import GrowthFallIcon from '../interactiveIcons/growthFallIcon';
import MicroLineChart, { MicroLineChartProps } from '../graphs/microLineCharts';

const sampleData: MicroLineChartProps[] = [
	{ time: '2024-02-01T00:00:00Z', value: 10 },
	{ time: '2024-02-02T00:00:00Z', value: 15 },
	{ time: '2024-02-03T00:00:00Z', value: 8 },
	{ time: '2024-02-04T00:00:00Z', value: 20 },
	{ time: '2024-02-05T00:00:00Z', value: 18 },
];
export interface AnalyticsCardProps {
	statType: string;
	currentStat: number;
	comparator: string;
	data: MicroLineChartProps[];
	growth: number;
	isGrowing: boolean;
}
export default function AnalyticsCard({ className = '' }) {
	return (
		<div className={`statcard ${className}`}>
			<div className='statcard-stat'>
				<div>
					<h1 className='statcard-type'>Artists</h1>
					<h2 className='statcard-count'>3535</h2>
				</div>
				<div className='statcard-graph'>
					<MicroLineChart data={sampleData} />
				</div>
			</div>
			<div className='statcard-growth'>
				<span>since last month</span>
				<span className='growth'>
					56%
					<GrowthFallIcon />
				</span>
			</div>
		</div>
	);
}
