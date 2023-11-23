import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDb = async (userData: IUser) => {
    const result = await User.create(userData);
    return result;
}

export const UserServices = {
    createUserIntoDb,
}