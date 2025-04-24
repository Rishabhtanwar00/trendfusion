import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/shopContext.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1, // reduce from default 3
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<StrictMode>
			<ShopContextProvider>
				<QueryClientProvider client={queryClient}>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ShopContextProvider>
		</StrictMode>
	</BrowserRouter>
);
