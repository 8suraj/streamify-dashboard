import GrowthFallIcon from '../interactiveIcons/growthFallIcon';
import MicroLineChart, { MicroLineChartProps } from '../graphs/microLineCharts';
import { formatNumber } from '../../lib/utils';


export interface AnalyticsCardProps {
	statType: string;
	currentStat: number;
	comparator: string;
	data: MicroLineChartProps[];
	growth: number;
	isGrowing: boolean;
	className:string
}
export default function AnalyticsCard(props:AnalyticsCardProps) {
	return (
		<div className={`statcard ${props.className}`}>
			<div className='statcard-stat'>
				<div>
					<h1 className='statcard-type'>{props.statType}</h1>
					<h2 className='statcard-count'>{formatNumber(props.currentStat)}</h2>
				</div>
				<div className='statcard-graph'>
					<MicroLineChart data={props.data} />
				</div>
			</div>
			<div className='statcard-growth'>
				<span>{props.comparator}</span>
				<span className={props.isGrowing?'growth':'fall'}>
					{`${props.growth}%`}
					<GrowthFallIcon type={props.isGrowing?'growth':'fall'}/>
				</span>
			</div>
		</div>
	);
}
