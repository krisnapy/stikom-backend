import Auth from "./auth.routes";
import User from "./user.routes";
import Admin from "./admin.routes";
import Microsoft from "./microsoft.routes";
import ProgramStudy from "./program-study.routes";

const route = require("express").Router();

route.use("/api/v1", Auth);
route.use("/api/v1", User);
route.use("/api/v1", Admin);
route.use("/api/v1", Microsoft);
route.use("/api/v1", ProgramStudy);

export default route;
