import { QueryInterface } from "sequelize";

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "program_studies",
    [
      {
        id: 1,
        name: "Sistem Informasi",
        code: "SI",
        degree: "S1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Sistem Komputer",
        code: "SK",
        degree: "S1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Teknologi Informasi",
        code: "TI",
        degree: "S1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Bisnis Digital",
        code: "BD",
        degree: "S1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "Manajemen Informatika",
        code: "MI",
        degree: "D3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete(
    "program_studies",
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    {}
  );
};

export { down, up };
