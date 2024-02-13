import argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import pick from "lodash/pick";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/env";
import { generateRequiredFields } from "@/utils/generate-required-field";
import { getUserById, getUserByUsername } from "@/services/user.services";
import { Route } from "@/types/route.types";
import { errorHandler } from "@/utils/error-handler";
import { UserAttributes } from "@/models/user.model";

const login: Route = async (req, res) => {
  try {
    const requiredFields = generateRequiredFields(req.body, [
      "username",
      "password",
    ]);

    if (requiredFields.error) {
      return res.status(400).json(requiredFields);
    }

    const user = await getUserByUsername(req.body.username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid username or password!!" });
    }

    const matchPass = await argon2.verify(
      user.dataValues.password,
      req.body.password
    );

    if (!matchPass) {
      return res
        .status(401)
        .json({ message: "Invalid username or password!!" });
    }

    const userObj = pick(user, [
      "id",
      "username",
      "email",
      "fullName",
      "avatar",
      "phoneNumber",
    ]);

    const refreshToken = jwt.sign(userObj, REFRESH_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const accessToken = jwt.sign(userObj, ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });

    const accessTokenDecode = jwt.decode(accessToken, {
      complete: true,
    }) as JwtPayload;

    const refreshTokenDecode = jwt.decode(refreshToken, {
      complete: true,
    }) as JwtPayload;

    res.set("Authorization", accessToken);
    res.set(
      "Access-Token-Expires",
      new Date(accessTokenDecode.payload.exp * 1000).toISOString()
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(refreshTokenDecode.payload.exp * 1000),
    });

    return res.status(200).json({
      user: user.setAttributes("password", ""),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const me: Route = async (_, res) => {
  try {
    const user = await getUserById(res.locals.auth.id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const logout: Route = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logout success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const refreshToken: Route = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return errorHandler({ status: 401, message: "Invalid token" }, res);
    }

    const auth = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as UserAttributes;

    const user = await getUserById(auth.id, {
      attributes: [
        "id",
        "username",
        "email",
        "fullName",
        "avatar",
        "phoneNumber",
      ],
    });

    if (!user) {
      return errorHandler({ status: 401, message: "Invalid token" }, res);
    }

    const accessToken = jwt.sign(user.dataValues, ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });

    const newRefreshToken = jwt.sign(user.dataValues, REFRESH_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const accessTokenDecode = jwt.decode(accessToken, {
      complete: true,
    }) as JwtPayload;

    const newRefreshTokenDecode = jwt.decode(newRefreshToken, {
      complete: true,
    }) as JwtPayload;

    res.set("Authorization", accessToken);
    res.set(
      "Access-Token-Expires",
      new Date(accessTokenDecode.payload.exp * 1000).toISOString()
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(newRefreshTokenDecode.payload.exp * 1000),
    });

    return res.status(200).json({ user });
  } catch (error) {
    return errorHandler({}, res);
  }
};

export default { login, me, logout, refreshToken };
