import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userService = {
  createUser: async (data) => {
    return await prisma.user.create({ data });
  },
};

export default userService;
