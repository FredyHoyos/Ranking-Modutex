import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  const user = await prisma.user.create({
    data: {
      name: 'Administrador',
      username: 'admin',   
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Usuario creado:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
