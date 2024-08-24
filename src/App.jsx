/** @jsxImportSource @emotion/react */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";

const SongList = lazy(() => import("./components/SongList"));
const SongForm = lazy(() => import("./components/SongForm"));

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<SongList />} />
						<Route path="/add" element={<SongForm />} />
						<Route path="/edit/:id" element={<SongForm />} />
					</Routes>
				</Suspense>
			</Router>
		</ThemeProvider>
	);
}

export default App;
