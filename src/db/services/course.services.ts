import { eq } from "drizzle-orm";

import { InferInsertType, InferUpdateType } from "@/types/drizzle.types";
import { Pagination } from "@/types/pagination.types";

import { db } from "..";
import { courses } from "../schemas";
import { getDataList } from "../helpers/get-data-list";

export const findCourseById = async (id: string) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, id),
    with: {
      courseName: {
        columns: {
          name: true,
        },
      },
      programStudy: {
        columns: {
          code: true,
          name: true,
          degree: true,
        },
      },
    },
  });
};

export const findAllCourses = async (pagination?: Pagination<"courses">) => {
  return await getDataList<"courses">(courses, pagination, {
    with: {
      courseName: {
        columns: {
          name: true,
        },
      },
      programStudy: {
        columns: {
          code: true,
          name: true,
          degree: true,
        },
      },
    },
  });
};

export const createCourse = async (data: InferInsertType<"courses">) => {
  const [course] = await db.insert(courses).values(data).returning();

  return course;
};

export const updateCourseById = async (
  data: InferUpdateType<"courses">,
  id: string
) => {
  return await db.update(courses).set(data).where(eq(courses.id, id));
};

export const deleteCourseById = async (id: string) => {
  return await db.delete(courses).where(eq(courses.id, id));
};
