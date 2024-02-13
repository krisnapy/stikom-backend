import { QueryInterface } from "sequelize";

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "religions",
    [
      {
        id: 1,
        name: "islam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "kristen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "katolik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "hindu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "buddha",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "kong hu cu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete(
    "religions",
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    {}
  );
};

export { down, up };
