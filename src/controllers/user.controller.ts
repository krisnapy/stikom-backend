import { hash } from "argon2";

import {
  createUser,
  deleteUserById,
  editUserById,
  getAllUsers,
  getUserById,
} from "@/services/user.services";
import { Route } from "@/types/route.types";

const createNewUser: Route = async (req, res) => {
  try {
    const hashPass = await hash(req.body.password);

    const user = await createUser({
      ...req.body,
      roleId: Number(req.body.roleId),
      password: hashPass,
    });

    return res.status(201).json({ user: user.setAttributes("password", "") });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser: Route = async (req, res) => {
  try {
    const user = await editUserById(req.body, req.params.id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers: Route = async (req, res) => {
  try {
    const users = await getAllUsers({
      attributes: { exclude: ["password"] },
      offset: Number(req.query.offset || 0),
      limit: Number(req.query.limit || 10),
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUser: Route = async (req, res) => {
  try {
    const users = await getUserById(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser: Route = async (req, res) => {
  try {
    await deleteUserById(req.params.id);

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  createNewUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
};
