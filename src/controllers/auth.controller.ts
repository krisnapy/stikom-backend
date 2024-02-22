import pick from "lodash/pick";
import { Argon2id as Argon2 } from "oslo/password";
import omit from "lodash/omit";

import { findUserById, findUserByUsername } from "@/db/services/user.services";
import { ElysiaContext } from "@/types/elysia-context.types";

const argon2 = new Argon2();

export type AuthContext = ElysiaContext<{
  body: {
    username: string;
    password: string;
  };
}>;

const login = async ({
  body,
  set,
  generateAccessSession,
  generateRefreshSession,
  generateRequiredFields,
}: AuthContext) => {
  try {
    const requiredFields = generateRequiredFields(["username", "password"]);

    if (requiredFields) return requiredFields;

    const user = await findUserByUsername(body.username);

    if (!user) {
      set.status = 401;
      const error = new Error("Invalid username or password!!");
      error.name = "InvalidCredentials";
      throw error;
    }

    const matchPass = await argon2.verify(user.password, body.password);

    if (!matchPass) {
      set.status = 401;
      const error = new Error("Invalid username or password!!");
      error.name = "InvalidCredentials";
      throw error;
    }

    const userObj = pick(user, ["id"]);

    await generateAccessSession(userObj);
    await generateRefreshSession(userObj);

    set.status = 200;

    return { message: "Login successful!!", user: omit(user, ["password"]) };
  } catch (error) {
    console.error(error);
    set.status = 500;
    return error;
  }
};

const me = async ({ user, set }: AuthContext) => {
  try {
    const data = await findUserById(user.id);

    set.status = 200;
    return { message: "Success", user: omit(data, ["password"]) };
  } catch (error) {
    set.status = 500;
    return error;
  }
};

const logout = async ({ set, cookie }: AuthContext) => {
  try {
    const refreshToken = cookie.refreshToken;

    if (!refreshToken) return (set.status = 200);

    cookie.refreshToken.set({
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(0),
      value: "",
    });

    set.status = 200;

    return { message: "Logout success" };
  } catch (error) {
    set.status = 500;
    return { message: "Logout failed", data: error };
  }
};

const refreshToken = async ({
  set,
  cookie,
  jwtRefresh,
  generateAccessSession,
}: AuthContext) => {
  try {
    const refreshToken = String(cookie.refreshToken);

    set.status = 401;
    if (!refreshToken) throw new Error("Invalid token");

    const auth = await jwtRefresh.verify(refreshToken);

    const user = await findUserById(auth.id);

    if (!user) throw new Error("Invalid token");

    const userObj = pick(user, ["id"]);

    await generateAccessSession(userObj);

    set.status = 200;

    return { message: "Refresh token success", user: omit(user, ["password"]) };
  } catch (error) {
    set.status = 500;
    return { message: "Refresh token failed", data: error };
  }
};

export default { login, me, logout, refreshToken };
