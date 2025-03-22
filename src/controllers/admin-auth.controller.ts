import pick from "lodash/pick";
import omit from "lodash/omit";
import { Argon2id as Argon2 } from "oslo/password";

import { ElysiaContext } from "@/types/elysia-context.types";
import { findAdminByEmail, findAdminByUuid } from "@/db/services";

const argon2 = new Argon2();

export type AuthContext = ElysiaContext<{
  email: string;
  password: string;
}>;

const login = async ({
  body,
  set,
  generateAccessSession,
  generateRefreshSession,
  generateRequiredFields,
}: AuthContext) => {
  try {
    const error = generateRequiredFields(["email", "password"]);

    if (error) return error;

    const admin = await findAdminByEmail(body.email);

    if (!admin) {
      set.status = 401;
      const error = new Error("Invalid email or password!!");
      error.name = "InvalidCredentials";
      throw error;
    }

    const matchPass = await argon2.verify(admin.password, body.password);

    if (!matchPass) {
      set.status = 401;
      const error = new Error("Invalid email or password!!");
      error.name = "InvalidCredentials";
      throw error;
    }

    const adminObj = pick(admin, ["id"]);

    await generateAccessSession(adminObj);
    await generateRefreshSession(adminObj);

    set.status = 200;

    return { message: "Login successful!!", admin: omit(admin, ["password"]) };
  } catch (error) {
    set.status = 500;
    return error;
  }
};

const me = async ({ admin, set }: AuthContext) => {
  try {
    const data = await findAdminByUuid(admin.uuid);

    set.status = 200;
    return { message: "Success", admin: omit(data, ["password"]) };
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

    const admin = await findAdminByUuid(auth.uuid);

    if (!admin) throw new Error("Invalid token");

    const adminObj = pick(admin, ["uuid"]);

    await generateAccessSession(adminObj);

    set.status = 200;

    return {
      message: "Refresh token success",
      admin: omit(admin, ["password"]),
    };
  } catch (error) {
    set.status = 500;
    return { message: "Refresh token failed", data: error };
  }
};

export default { login, me, logout, refreshToken };
