import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { formatNumber } from '../../lib/utils';
interface TopArtistCardProps {
	className?: string;
	artistName: string;
	artistImage: string;
	totalStreams: number;
}

export default function TopArtistCard(props: TopArtistCardProps) {
	return (
		<div className={`statcard ${props.className}`}>
			<div className='statcard-stat'>
				<div>
					<h1 className='statcard-type'>Top Artist</h1>
					<h2 className='statcard-name'>{props.artistName}</h2>
				</div>
				<div className='statcard-artistImg'>
					<LazyLoadImage
						src={props.artistImage}
						alt={props.artistName}
						effect='blur'
						className='w-16 h-16 rounded-full'
					/>
				</div>
			</div>
			<div className='statcard-growth'>
				<span>Total Streams</span>
				<span>{formatNumber(props.totalStreams)}</span>
			</div>
		</div>
	);
}
