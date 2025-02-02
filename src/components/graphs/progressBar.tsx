export default function ProgressBar({ percentage }) {
	return (
		<div className='flex  items-center justify-center space-y-1 flex-1'>
			{/* Percentage Label */}

			{/* Progress Bar */}
			<div className='w-full h-2 bg-gray-200 rounded-full '>
				<div
					className='h-full bg-yellow-500 rounded-full'
					style={{ width: `${percentage}%` }} // Dynamic width
				/>
			</div>
			{/* <span className='text-lg font-semibold'>{percentage}%</span> */}
		</div>
	);
}
