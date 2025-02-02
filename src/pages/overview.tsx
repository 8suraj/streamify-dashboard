import DatagridTable from '../components/datagridTable/datagridTable';
import RevenueSidebar from '../components/revenueSidebar/revenueSidebar';
import StatCard from '../components/analyticsCard/analyticsCard';
import TopArtistBanner from '../components/banners/topArtistBanner';
import TopArtistCard from '../components/cards/topArtistCard';
import TopStreamedSongsChart from '../components/graphs/topSongsCharts';
import UserGrowthChart from '../components/graphs/userChart';
import useIsLargeScreen from '../hooks/useIsLargeScreen';
import { songDataColumns } from '../lib/tableColumnDefs';
import { ISongData } from '../lib/types/table';

const songData: ISongData[] = [
	{
		songName: 'Blinding Lights',
		artist: 'The Weeknd',
		dateStreamed: '2024-02-01',
		streamCount: 15000,
		userId: 'USR123',
	},
	{
		songName: 'Shape of You',
		artist: 'Ed Sheeran',
		dateStreamed: '2024-02-02',
		streamCount: 18000,
		userId: 'USR456',
	},
	{
		songName: 'Levitating',
		artist: 'Dua Lipa',
		dateStreamed: '2024-02-03',
		streamCount: 14000,
		userId: 'USR789',
	},
];

export default function Overview() {
	const isLargeScreen = useIsLargeScreen(1024); // Use custom hook

	return (
		<div className='overview'>
			<div className='px-4 py-10 pl-8 max-lg:w-full w-[75%] flex flex-col gap-8'>
				<h1 className='overview-header'>Overview</h1>

				<div className='overview-stats'>
					<StatCard className='bg-[#c6d0bc]' />
					<StatCard className='bg-[#f6d78b]' />
					<StatCard className='bg-[#a3a7fc]' />
					<StatCard className='bg-[#a3fcc5]' />

					<TopArtistCard className='bg-[#ee5d191a]' />
				</div>
				<TopArtistBanner />
				<div className=''>
					<h1 className='overview-header'>User in Last Month</h1>
					<UserGrowthChart className='overview-usergrowth-graph' />
				</div>
				<div>
					<h1 className='overview-header'>
						Top 5 Most Streamed Songs (Last 30 Days)
					</h1>
					<TopStreamedSongsChart />
				</div>
				<div>
					<h1 className='overview-header'>Recent Streams</h1>
					<DatagridTable<ISongData>
						isFilterEnabled
						isSortingEnabled
						isPaginationEnabled
						columns={songDataColumns}
						data={songData}
					/>
				</div>
			</div>

			{isLargeScreen && <RevenueSidebar />}
		</div>
	);
}
