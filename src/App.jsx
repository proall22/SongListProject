/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import GlobalStyles from "./GlobalStyles";

const SongList = lazy(() => import("./components/SongList"));
const SongForm = lazy(() => import("./components/SongForm"));

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<div
				css={{
					padding: "20px",
					background: "linear-gradient(to right, #00c6ff, #0072ff)",
					minHeight: "100vh",
				}}
			>
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<SongList />} />
							<Route path="/add" element={<SongForm />} />
							<Route path="/edit/:id" element={<SongForm />} />
						</Routes>
					</Suspense>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
