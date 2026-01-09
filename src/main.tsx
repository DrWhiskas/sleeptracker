
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import App from './App'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/App" element={<App />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
