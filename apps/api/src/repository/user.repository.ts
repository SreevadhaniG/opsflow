import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { CreateUserDto, UpdateUserDto } from "../types/user.dto.js";

async function getUsers(page?: number, limit?: number) {
  const total = await prisma.user.count();

  if (page === undefined || limit === undefined) {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
    });

    return {
      users,
      total,
    };
  }

  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      id: "asc",
    },
  });

  return {
    users,
    total,
  };
}

async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function createUser(data: CreateUserDto) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
}

async function updateUser(id: number, data: UpdateUserDto) {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
}

async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return false;
    }

    throw error;
  }
}

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
