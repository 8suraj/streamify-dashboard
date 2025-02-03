import React, { useEffect, useState, ReactNode, Suspense } from 'react';

interface LazyLoaderProps {
	children: ReactNode;
	threshold?: number;
	className?: string;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
	children,
	threshold = 0.1,
	className = '',
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const observerCallback = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(entry.target); // Stop observing once the element is visible
			}
		});
	};

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, { threshold });
		const element = document.getElementById('lazy-load-element');
		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [threshold]);

	return (
		<div id='lazy-load-element' className={className}>
			{isVisible && (
				<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
			)}
		</div>
	);
};

export default LazyLoader;
