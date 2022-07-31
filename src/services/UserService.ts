import { Users } from "../entities/Users";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IUserRepositories {
    id?: string,
    name: string;
    login: string;
    password?: string;
    email?: string;
    admin?: boolean;
}

const generatePassword = (password: string) => {
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

export const createUser = async ({name, login, password, email}: IUserRepositories) => {
    const user = UsersRepositories;
    const new_user = user.create({name, login, password, email});

    new_user.password = generatePassword(new_user.password);
    await user.save(new_user);
    return new_user;
}

export const findUser = async (id: string) => {
    const user = UsersRepositories;
    const find_user = await user.createQueryBuilder()
                            .select(["user.name", "user.login", "user.email"])
                            .from(Users, "user")
                            .where("user.id = :id", { id })
                            .getOne();

    if(!find_user){
        return { "message": "Usuário Não Encontrado", "data": {}, "status": 400 }
    }

    return { "message": "Usuário Encontrado", "data": find_user, "status": 200 }
}

export const updateUser = async ({name, login, password, email, id}: IUserRepositories) => {
    const user = UsersRepositories;

    const find_user = await findUser(id);
    if(find_user.status === 400) {
        return find_user;
    }

    const update_user = await user.createQueryBuilder()
    .update() 
    .set({ name: name, login: login, email: email })
    .where("id = :id", { id })
    .execute();

    return update_user;
}
