import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import staticContent from '../../db.json';
export interface ArtistBannerProps {
	artistDetails: ArtistProps[];
}
export default function TopArtistBanner() {
	return (
		<div className='topArtistBanner'>
			<h1 className='topArtistBanner-header'>top artist</h1>
			<div className='topArtistBanner-artists'>
				{staticContent.topArtists.map((artist) => (
					<ArtistDetails image={artist.image} artistName={artist.name} />
				))}
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
			<LazyLoadImage src={props.image} alt={props.artistName} effect='blur' />
			<h2 className='topArtistBanner-artist-name'>{props.artistName}</h2>
		</div>
	);
}
