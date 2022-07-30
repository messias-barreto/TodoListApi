import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Users {
    @PrimaryColumn()
    id: string;
    @Column({type: 'text'})
    name: string;
    @Column({type: 'text'})
    login: string;
    @Column({type: 'text'})
    password: string;
    @Column({type: 'text'})
    email: string;
    @Column({type: 'boolean', default: false})
    admin: boolean;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}