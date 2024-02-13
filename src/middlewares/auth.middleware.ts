import jwt from "jsonwebtoken";

import { Route } from "@/types/route.types";
import { ACCESS_TOKEN_SECRET } from "@/env";
import { getUserById } from "@/services/user.services";
import { UserAttributes } from "@/models/user.model";
import { AdminAttributes } from "@/models/admin.model";

export const loginMiddleware: Route = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "You're not authorized to access this" });
    }

    const token = req.headers.authorization.split(" ").pop();

    const auth = jwt.verify(token, ACCESS_TOKEN_SECRET) as UserAttributes;

    const user = await getUserById(auth.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "You're not authorized to access this" });
    }

    res.locals.auth = auth;

    return next();
  } catch (error) {
    res.status(401).json({ message: "You're not authorized to access this" });
  }
};

export const adminMiddleware: Route = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "You're not authorized to access this" });
    }

    const token = req.headers.authorization.split(" ").pop();

    const auth = jwt.verify(token, ACCESS_TOKEN_SECRET) as AdminAttributes;

    const user = await getUserById(auth.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "You're not authorized to access this" });
    }

    if (user.roleId !== 1) {
      return res
        .status(401)
        .json({ message: "You're not authorized to access this" });
    }

    res.locals.auth = auth;

    return next();
  } catch (error) {
    res.status(401).json({ message: "You're not authorized to access this" });
  }
};
