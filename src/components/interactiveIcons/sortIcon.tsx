export const SortIcon = ({
	sortOrder,
	onClick,
}: {
	sortOrder: 'asc' | 'desc' | null | false;
	onClick: ((event: unknown) => void) | undefined;
}) => {
	return (
		<svg
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			onClick={onClick}
			className='size-4'
		>
			<path
				d='M12 4L6 10H18L12 4Z'
				fill={sortOrder === 'asc' ? '#ee5d19' : '#363535'}
			/>
			<path
				d='M12 20L6 14H18L12 20Z'
				fill={sortOrder === 'desc' ? '#ee5d19' : '#363535'}
			/>
		</svg>
	);
};
