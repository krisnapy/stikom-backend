import { Elysia } from "elysia";

import routes from "./routes";

const app = new Elysia();

app.use(routes).listen(9091);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
