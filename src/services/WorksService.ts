import { Works } from "../entities/Works";
import { WorksRepositories } from "../repositories/WorkRepositories"
import { findUser } from "./UserService";

interface IWorks {
    id?: string;
    title: string;
    description?: string;
    user_id: string
}

export const getAllWorks = async (user_id: string) => {
    const work = WorksRepositories;
    const user = await findUser(user_id);

    const find_works = await work.createQueryBuilder()
                                .select(["works.id", "works.title", "works.description"])
                                .from(Works, "works")
                                .where("works.user_id = :user", { user: user_id })
                                .getMany();

    if(!find_works){
        return { "message": "Trabalho Não Encontrado", "data": {} }
    }
                            
    return { "message": "Trabalho Encontrado", "data": find_works, "status": 200 }
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