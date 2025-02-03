import StatCard from '../components/analyticsCard/analyticsCard';
import useIsLargeScreen from '../hooks/useIsLargeScreen';
import { songDataColumns } from '../lib/tableColumnDefs';
import { ISongData } from '../lib/types/table';
import staticData from '../db.json';
import LazyLoader from '../hoc/lazyLoader';
import { lazy } from 'react';
const TopArtistCard = lazy(() => import('../components/cards/topArtistCard'));
const UserGrowthChart = lazy(() => import('../components/graphs/userChart'));
const TopStreamedSongsChart = lazy(
	() => import('../components/graphs/topSongsCharts')
);
const TopArtistBanner = lazy(
	() => import('../components/banners/topArtistBanner')
);
const DatagridTable = lazy(
	() => import('../components/datagridTable/datagridTable')
);
const RevenueSidebar = lazy(
	() => import('../components/revenueSidebar/revenueSidebar')
);

export default function Overview() {
	const isLargeScreen = useIsLargeScreen(1024); // Use custom hook

	return (
		<div className='overview'>
			<div className='px-4 py-10  max-lg:w-full w-[75%] flex flex-col gap-8'>
				<h1 className='overview-header'>Overview</h1>

				<div className='overview-stats'>
					{staticData.analytics.map((metric) => (
						<StatCard
							key={metric.statType}
							statType={metric.statType}
							currentStat={metric.currentStat}
							comparator={metric.comparator}
							growth={metric.growth}
							isGrowing={metric.isGrowing}
							data={metric.data}
							className={metric.className}
						/>
					))}

					<TopArtistCard
						className='bg-[#ee5d191a]'
						artistName={staticData.topArtist.artistName}
						artistImage={staticData.topArtist.artistImage}
						totalStreams={staticData.topArtist.totalStreams}
					/>
				</div>
				<LazyLoader>
					<TopArtistBanner />
				</LazyLoader>

				<LazyLoader>
					<h1 className='overview-header'>User in Last Month</h1>
					<UserGrowthChart className='overview-usergrowth-graph' />
				</LazyLoader>

				<LazyLoader>
					<h1 className='overview-header'>
						Top 5 Most Streamed Songs (Last 30 Days)
					</h1>
					<TopStreamedSongsChart />
				</LazyLoader>

				<LazyLoader>
					<h1 className='overview-header'>Recent Streams</h1>
					<DatagridTable<ISongData>
						isFilterEnabled
						isSortingEnabled
						isPaginationEnabled
						columns={songDataColumns}
						data={staticData.songData}
					/>
				</LazyLoader>
			</div>

			<LazyLoader className='lg:w-[25%]'>
				{isLargeScreen && <RevenueSidebar />}
			</LazyLoader>
		</div>
	);
}
