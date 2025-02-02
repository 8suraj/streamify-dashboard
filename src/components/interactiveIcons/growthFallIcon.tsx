const GrowthFallIcon = ({ type = 'growth', size = 14 }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			{type === 'growth' ? (
				<polygon points='12,4 4,16 20,16' />
			) : (
				<polygon points='12,20 4,8 20,8' />
			)}
		</svg>
	);
};
export default GrowthFallIcon;
