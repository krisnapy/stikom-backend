import { QueryInterface } from "sequelize";

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "admins",
    [
      {
        id: "2fc321f7-fff3-435c-915c-4a14b994e921",
        username: "superAdmin",
        email: "superadmin@test.com",
        adminType: "superadmin",
        phoneNumber: "081234567890",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$ks1Mihhg24Z18QFzv02LWg$IPCOiBqyW8DghsPz5baQ3Zr6l6bDR66QqJPkgSoHE+I",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6468b531-6140-4b84-a3b5-3e5623f35b5e",
        username: "admin",
        email: "admin@test.com",
        adminType: "admin",
        phoneNumber: "0812345678900",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$ks1Mihhg24Z18QFzv02LWg$IPCOiBqyW8DghsPz5baQ3Zr6l6bDR66QqJPkgSoHE+I",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete(
    "admins",
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    {}
  );
};

export { down, up };
