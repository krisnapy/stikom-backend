import { Sequelize } from "sequelize";

import { DATABASE_URL } from "@/env";

import * as config from "./config";

export const connection = DATABASE_URL
  ? new Sequelize(DATABASE_URL)
  : new Sequelize(config);
