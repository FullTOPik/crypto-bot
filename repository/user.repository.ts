import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static async createUser(userData: Omit<User, "id">): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: userData,
    });

    if (!newUser) return null;

    return newUser;
  }

  static async findUserByTelegramId(telegramId: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { telegramId },
    });

    if (!user) return null;

    return user;
  }

  static async findAllUsers(): Promise<User[] | null> {
    const users = await prisma.user.findMany();

    if (!users || users[0]) return null;

    return users;
  }
}
