import { DataSource } from "typeorm";
import { User } from "./modules/users/entities/user.entity";
import * as bcrypt from "bcrypt";

async function bootstrap() {
  const dataSource = new DataSource({
    type: "better-sqlite3",
    database: "kvrat.db",
    entities: [User],
    synchronize: false,
  });

  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);

  // 🔍 check if admin exists
  const existingAdmin = await userRepo.findOne({
    where: { email: "admin@test.com" },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin already exists");
    await dataSource.destroy();
    return;
  }

  // 🔐 create admin
  const hashedPassword = await bcrypt.hash("123456", 12);

  const admin = userRepo.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin",
  });

  await userRepo.save(admin);

  console.log("✅ Admin created successfully");

  await dataSource.destroy();
}

bootstrap();