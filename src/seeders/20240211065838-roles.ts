import { QueryInterface } from "sequelize";

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "roles",
    [
      {
        id: 1,
        name: "dosen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "mahasiswa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete(
    "roles",
    [
      {
        name: "dosen",
      },
      {
        name: "mahasiswa",
      },
    ],
    {}
  );
};

export { down, up };
