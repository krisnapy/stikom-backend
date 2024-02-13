import { hash } from "argon2";

import {
  createAdmin,
  deleteAdminById,
  editAdminById,
  getAdminById,
  getAllAdmins,
} from "@/services/admin.services";
import { Route } from "@/types/route.types";

const createNewAdmin: Route = async (req, res) => {
  try {
    const hashPass = await hash(req.body.password);

    const user = await createAdmin({
      ...req.body,
      password: hashPass,
    });

    return res.status(201).json({ user: user.setAttributes("password", "") });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateAdmin: Route = async (req, res) => {
  try {
    const user = await editAdminById(req.body, req.params.id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAdmins: Route = async (req, res) => {
  try {
    const users = await getAllAdmins({
      attributes: { exclude: ["password"] },
      offset: Number(req.query.offset || 0),
      limit: Number(req.query.limit || 10),
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAdmin: Route = async (req, res) => {
  try {
    const users = await getAdminById(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAdmin: Route = async (req, res) => {
  try {
    await deleteAdminById(req.params.id);

    return res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  createNewAdmin,
  updateAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
};
