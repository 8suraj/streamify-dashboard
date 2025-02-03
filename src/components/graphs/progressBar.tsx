export default function ProgressBar({ percentage }: { percentage: number }) {
	return (
		<div className='flex  items-center justify-center space-y-1 flex-1'>
			<div className='w-full h-2 bg-gray-200 rounded-full '>
				<div
					className='h-full bg-yellow-500 rounded-full'
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
}
