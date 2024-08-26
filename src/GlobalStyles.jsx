/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

const GlobalStyles = () => (
	<Global
		styles={css`
			body {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				background: #f0e0f0;
				font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
			}
		`}
	/>
);

export default GlobalStyles;
