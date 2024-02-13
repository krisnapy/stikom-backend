import { hash } from "argon2";

import {
  createProgramStudy,
  deleteProgramStudyById,
  editProgramStudyById,
  getProgramStudyById,
  getAllProgramStudies,
} from "@/services/program-study.services";
import { Route } from "@/types/route.types";

const createNewProgramStudy: Route = async (req, res) => {
  try {
    const hashPass = await hash(req.body.password);

    const user = await createProgramStudy({
      ...req.body,
      password: hashPass,
    });

    return res.status(201).json({ user: user.setAttributes("password", "") });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateProgramStudy: Route = async (req, res) => {
  try {
    const user = await editProgramStudyById(req.body, req.params.id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProgramStudies: Route = async (req, res) => {
  try {
    const users = await getAllProgramStudies({
      attributes: { exclude: ["password"] },
      offset: Number(req.query.offset || 0),
      limit: Number(req.query.limit || 10),
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProgramStudy: Route = async (req, res) => {
  try {
    const users = await getProgramStudyById(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteProgramStudy: Route = async (req, res) => {
  try {
    await deleteProgramStudyById(req.params.id);

    return res.status(200).json({ message: "Program Study deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  createNewProgramStudy,
  updateProgramStudy,
  getProgramStudies,
  getProgramStudy,
  deleteProgramStudy,
};
