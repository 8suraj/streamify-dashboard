import RevenueNightingaleChart from '../graphs/revenuePieChart';
import ProgressBar from '../graphs/progressBar';
import { useState } from 'react';
import { MonthlyRevenue } from '../../lib/types';
import data from '../../db.json';
export default function RevenueSidebar() {
	const [currentRevenueData, setCurrentRevenueData] =
		useState<MonthlyRevenue | null>({
			month: 'Jan',
			subscriptions: 50000,
			ads: 20000,
			sponsorships: 10000,
			affiliate: 5000,
			total: 85000,
		});
	return (
		<div className=' overview-revenue '>
			<div className='overview-revenue-graph'>
				<h1 className='overview-header'>
					Monthly Revenue (
					{`${currentRevenueData?.month} Total: ${currentRevenueData?.total}`})
				</h1>
				{currentRevenueData ? (
					<RevenueNightingaleChart revenueData={currentRevenueData} />
				) : (
					''
				)}
			</div>
			<div className='bg-[#f1eee3] p-3 '>
				<h1 className='overview-header'>Last Revenues</h1>
				<div className='flex flex-col gap-3 max-h-[30rem] overflow-y-scroll'>
					{data.monthlyRevenue.map((item: MonthlyRevenue) => (
						<RevenueCard revenue={item} onClick={setCurrentRevenueData} />
					))}
				</div>
			</div>
		</div>
	);
}

function RevenueCard({
	revenue,
	onClick,
}: {
	revenue: MonthlyRevenue;
	onClick: (revenue: MonthlyRevenue) => void;
}) {
	return (
		<div
			className='bg-[#f8f7f1] rounded-lg p-3 shadow-[0px_3.86px_7.33px_0px_rgba(0,0,0,0.12)] cursor-pointer hover:scale-100 scale-95'
			onClick={() => onClick(revenue)}
		>
			<div className='flex flex-col gap-2'>
				<div className='text-lg font-bold capitalize max-sm:text-base flex justify-between'>
					<span>{revenue?.month}</span>

					<span>{`$ ${revenue?.total}`}</span>
				</div>
				<div className='flex gap-2'>
					<span className='min-w-[6rem]'>Subscription</span>
					<ProgressBar
						percentage={(revenue.subscriptions / revenue.total) * 100}
					/>
				</div>
				<div className='flex gap-2'>
					<span className='min-w-[6rem]'>Ads</span>
					<ProgressBar percentage={(revenue.ads / revenue.total) * 100} />
				</div>
				<div className='flex gap-2'>
					<span className='min-w-[6rem]'>Sponsorships</span>
					<ProgressBar
						percentage={(revenue.sponsorships / revenue.total) * 100}
					/>
				</div>
				<div className='flex gap-2'>
					<span className='min-w-[6rem]'>Affiliate</span>
					<ProgressBar percentage={(revenue.affiliate / revenue.total) * 100} />
				</div>
			</div>
		</div>
	);
}
