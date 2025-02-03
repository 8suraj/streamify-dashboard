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
import staticData from '../db.json'


export default function Overview() {
	const isLargeScreen = useIsLargeScreen(1024); // Use custom hook

	return (
		<div className='overview'>
			<div className='px-4 py-10  max-lg:w-full w-[75%] flex flex-col gap-8'>
				<h1 className='overview-header'>Overview</h1>

				<div className='overview-stats'>
					{staticData.analytics.map(metric =>
						<StatCard key={metric.statType}
							statType={metric.statType}
							currentStat={metric.currentStat}
							comparator={metric.comparator}
							growth={metric.growth}
							isGrowing={metric.isGrowing}
							data={metric.data}
							className={metric.className} />)}


					<TopArtistCard className='bg-[#ee5d191a]' artistName={staticData.topArtist.artistName}
						artistImage={staticData.topArtist.artistImage}
						totalStreams={staticData.topArtist.totalStreams} />
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
						data={staticData.songData}
					/>
				</div>
			</div>

			{isLargeScreen && <RevenueSidebar />}
		</div>
	);
}
