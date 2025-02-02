import './App.css';
import Navbar from './components/navbar/navbar';
import RevenueSidebar from './components/revenueSidebar/revenueSidebar';
import Overview from './pages/overview';
import './scss/main.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import useIsLargeScreen from './hooks/useIsLargeScreen';
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
			element: <RevenueSidebar />,
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
