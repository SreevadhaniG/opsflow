import { users } from "../data/users.data"
import { CreateUserDto, UpdateUserDto } from "../types/user.dto";
import User from "../types/user.types";

function getUsers() : User[]{
    return users;
}

function getUserById(id: number): User | undefined{
    const user = users.find(currentUser => currentUser.id === id);

    return user;
}

function createUser(data: CreateUserDto): User{
    let highestId = 0;

    for(const user of users){
        if(user.id > highestId){
            highestId = user.id;
        }
    }

    const id = highestId + 1;
    const {name, email} = data;

    const newUser = {
        id,
        name,
        email
    };

    users.push(newUser);

    return newUser;
}

function updateUser(id: number, data: UpdateUserDto): User | null{
    const user = users.find(currentUser => currentUser.id === id);

    if(!user){
        return null;
    }

    if(data.name !== undefined){
        user.name = data.name;
    }

    if(data.email !== undefined){
        user.email = data.email;
    }

    return user;
}

function deleteUser(id: number): boolean{
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return false;
    }

    users.splice(userIndex, 1);

    return true;
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}