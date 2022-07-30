import { WorksRepositories } from "../repositories/WorkRepositories"
import { findUser } from "./UserService";

interface IWorks {
    id?: string;
    title: string;
    description?: string;
    user_id: string
}

export const createWorks = async ({title, description, user_id}: IWorks) => {
    const work = WorksRepositories;
    const user = await findUser(user_id);

    if(user.status === 400){ 
        return { "message": "Erro ao Tentar Adicionar o Work!!", "data": {}, status: 400 } 
    }

    const new_work = work.create({title, description, user_id});    
    await work.save(new_work);
    return new_work;
}