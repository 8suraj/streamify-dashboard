import artist from '../assets/svgs/1.jpg';
export interface ArtistBannerProps {
	artistDetails: ArtistProps[];
}
export default function TopArtistBanner() {
	return (
		<div className='topArtistBanner'>
			<h1 className='topArtistBanner-header'>top artist</h1>
			<div className='topArtistBanner-artists'>
				<ArtistDetails image={artist} artistName='some anme' />
				<ArtistDetails image={artist} artistName='some anme' />
				<ArtistDetails image={artist} artistName='some anme' />
				<ArtistDetails image={artist} artistName='some anme' />
				<ArtistDetails image={artist} artistName='some anme' />
			</div>
		</div>
	);
}

interface ArtistProps {
	image: string;
	artistName: string;
}
function ArtistDetails(props: ArtistProps) {
	return (
		<div className='topArtistBanner-artist group'>
			<img src={props.image} alt='' />
			<h2 className='topArtistBanner-artist-name'>{props.artistName}</h2>
		</div>
	);
}
