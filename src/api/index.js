/* eslint-disable no-undef */

import { createServer } from "json-server";
import { join } from "path";

const handler = (req, res) => {
	// Set up JSON Server
	const server = createServer({
		watch: join(__dirname, "db.json"), // Path to your db.json file
	});

	// Pass the request to JSON Server
	server(req, res);
};

export default handler;
