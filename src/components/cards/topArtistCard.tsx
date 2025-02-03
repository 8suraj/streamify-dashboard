import artist from '../../assets/svgs/1.jpg';

export default function TopArtistCard({ className = '' }) {
	return (
		<div className={`statcard ${className}`}>
			<div className='statcard-stat'>
				<div>
					<h1 className='statcard-type'>Top Artist</h1>
					<h2 className='statcard-name'> Some name</h2>
				</div>
				<div className='statcard-artistImg'>
					<img src={artist} alt='' />
				</div>
			</div>
			<div className='statcard-growth'>
				<span>since last month</span>
				<span>56</span>
			</div>
		</div>
	);
}
