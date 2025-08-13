import { PrismaClient } from '../src/generated/prisma/index.js';

import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  const user = await prisma.user.create({
    data: {
      name: 'Usuario Prueba',
      email: 'prueba@mail.com',
      password: hashedPassword,
      role: 'admin'
    }
  });

  console.log('✅ Usuario creado:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
