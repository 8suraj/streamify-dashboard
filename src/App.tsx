import './App.css';
import Navbar from './components/navbar/navbar';
import Overview from './pages/overview';
import './scss/main.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import useIsLargeScreen from './hooks/useIsLargeScreen';
import { lazy, Suspense } from 'react';
const RevenueSidebar = lazy(
	() => import('./components/revenueSidebar/revenueSidebar')
);
const Router = () => {
	const isLargeScreen = useIsLargeScreen(1024); // Use custom hook

	const baseRoutes = [
		{
			path: '/',
			element: <Navbar />,
			children: [
				{
					path: '/',
					element: <Overview />,
				},
			],
		},
	];

	if (!isLargeScreen) {
		baseRoutes[0].children.push({
			path: '/revenue',
			element: (
				<Suspense fallback={<div>Loading...</div>}>
					<RevenueSidebar />
				</Suspense>
			),
		});
	}

	const routes = useRoutes(baseRoutes);
	return routes;
};

function App() {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
}

export default App;
