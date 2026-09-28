import AppError from "../error/appError";
import userRepository from "../repository/user.respository";
import { CreateUserDto, UpdateUserDto } from "../types/user.dto";

function getUsers(page?: number, limit?: number) {
  const result = userRepository.getUsers(page, limit);

  const users = result.users;

  if (page === undefined || limit === undefined) {
    return {
      users,
      meta: {}
    };
  }

  const totalPages = Math.ceil(result.total / limit);

  return {
    users,
    meta: {
      pagination: {
        page: page,
        limit: limit,
        total: result.total,
        totalPages: totalPages,
      },
    },
  };
}

async function getUserById(id: number) {
  const user = await userRepository.getUserById(id);

  if(!user){
    throw new AppError("User not found", 404);
  }

  return user;
}

async function createUser(data: CreateUserDto) {
  const user = await userRepository.getUserByEmail(data.email);

  if(user){
    throw new AppError("User already exist with this email", 409);
  }
  
  return userRepository.createUser(data);
}

async function updateUser(id: number, data: UpdateUserDto) {
  return userRepository.updateUser(id, data);
}

async function deleteUser(id: number) {
  return userRepository.deleteUser(id);
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
