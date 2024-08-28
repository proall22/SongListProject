import { create, router as createRouter, defaults } from "json-server";
import path from "path";

const server = create();
const router = createRouter(path.join(__dirname, "db.json")); // Make sure the path to db.json is correct
const middlewares = defaults();

server.use(middlewares);
server.use(router);

export default server;
