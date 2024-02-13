import { QueryInterface } from "sequelize";

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert(
    "users",
    [
      {
        id: "db99722a-9996-422c-a073-cb14bdc8d24c",
        username: "dosenStikomBali",
        email: "dosen@stikom-bali.ac.id",
        fullName: "Dosen Stikom Bali",
        birthDate: new Date("1990-06-25"),
        birthPlace: "Denpasar",
        address: "Graha Asri Persada",
        province: "Bali",
        gender: "male",
        religionId: 3,
        nik: "12345678901",
        city: "Denpasar",
        regency: "Denpasar",
        county: "Indonesia",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$ks1Mihhg24Z18QFzv02LWg$IPCOiBqyW8DghsPz5baQ3Zr6l6bDR66QqJPkgSoHE+I",
        phoneNumber: "0812345678900",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "db99722a-9996-422c-a073-cb14bdc8d24b",
        username: "210010129",
        email: "210010129@stikom-bali.ac.id",
        fullName: "I Putu Krisna Putra Yasa",
        birthDate: new Date("2003-06-25"),
        birthPlace: "Tabanan",
        address: "Graha Asri Persada",
        province: "Bali",
        gender: "male",
        religionId: 3,
        nik: "1234567890",
        nisn: "1234567890",
        city: "Tabanan",
        regency: "Tabanan",
        village: "Dauh Peken",
        county: "Indonesia",
        dosenId: "db99722a-9996-422c-a073-cb14bdc8d24c",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$ks1Mihhg24Z18QFzv02LWg$IPCOiBqyW8DghsPz5baQ3Zr6l6bDR66QqJPkgSoHE+I",
        phoneNumber: "081234567890",
        roleId: 2,
        registerDate: new Date("2021-09-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete(
    "users",
    [
      {
        username: "210010129",
      },
      {
        username: "dosenStikomBali",
      },
    ],
    {}
  );
};

export { down, up };
