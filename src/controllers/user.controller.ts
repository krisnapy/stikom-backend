import omit from "lodash/omit";
import { Argon2id } from "oslo/password";

import {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from "@/db/services";
import { ElysiaContext } from "@/types/elysia-context.types";
import { InferResultType } from "@/types/drizzle.types";

const argon2 = new Argon2id();

const createNewUser = async ({
  body,
  set,
}: ElysiaContext<{ body: InferResultType<"users"> }>) => {
  try {
    const hashPass = await argon2.hash(body.password);

    const user = await createUser({
      ...body,
      roleId: Number(body.roleId),
      religionId: Number(body.religionId),
      password: hashPass,
    });

    set.status = 201;

    return { message: "User created", user: omit(user, ["password"]) };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error" };
  }
};

const updateUser = async ({
  body,
  params,
  set,
}: ElysiaContext<{
  body: InferResultType<"users">;
}>) => {
  try {
    const user = await updateUserById(body, params.id);

    if (!user) {
      set.status = 404;
      return { message: "User not found" };
    }

    set.status = 200;

    return { message: "User updated", user: omit(user, ["password"]) };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const getUsers = async ({ query, set }: ElysiaContext) => {
  try {
    const users = await findAllUsers(query);

    return { message: "Get user list successful", ...users };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

const getUser = async ({ params, set }: ElysiaContext) => {
  try {
    const users = await findUserById(params.id, ["password"]);

    set.status = 200;
    return { message: "Get user successful", users: omit(users, ["password"]) };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error" };
  }
};

const deleteUser = async ({ params, set }: ElysiaContext) => {
  try {
    const user = await deleteUserById(params.id);

    if (!user) {
      set.status = 404;
      return { message: "User not found" };
    }

    set.status = 200;
    return { message: "User deleted" };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export default {
  createNewUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
