import { ZodEmail } from "zod";
import { users } from "../data/users.data.js"
import User from "../types/user.types.js";
import { CreateUserDto, UpdateUserDto } from "../types/user.dto.js";

function getUsers(page?: number, limit?: number) : {users: User[], total:number} {
    if(page === undefined || limit === undefined){
        return {
            users: users,
            total: users.length
        };
    }

    const startIndex = (page - 1)*limit;
    const endIndex = startIndex + limit;

    return {
        users: users.slice(startIndex, endIndex),
        total: users.length
    }
}

async function getUserById(id: number): Promise<User | undefined>{
    const user = users.find(currentUser => currentUser.id === id);

    return user;
}

    async function getUserByEmail(email: string): Promise<User | undefined>{
        return users.find(user => user.email === email);
    }

    async function createUser(data: CreateUserDto): Promise<User>{
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

async function updateUser(id: number, data: UpdateUserDto): Promise<User | null>{
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

async function deleteUser(id: number): Promise<boolean>{
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
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}