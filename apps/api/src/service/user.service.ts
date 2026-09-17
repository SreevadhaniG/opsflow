import userRepository from "../repository/user.respository";
import { CreateUserDto, UpdateUserDto } from "../types/user.dto";

const validateName = /^[a-zA-Z\s]+$/;
const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function getUsers() {
  return userRepository.getUsers();
}

function getUserById(id: number) {
  return userRepository.getUserById(id);
}

function createUser(data: CreateUserDto) {
  return userRepository.createUser(data);
}

function updateUser(id: number, data: UpdateUserDto) {
  return userRepository.updateUser(id, data);
}

function deleteUser(id: number) {
  return userRepository.deleteUser(id);
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
