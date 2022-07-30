import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./Users";

@Entity()
export class Works {
    @PrimaryColumn()
    id: string;
    @Column({type: 'text'})
    title: string;
    @Column({type: 'text'})
    description: string;
    @Column({type: 'text'})
    user_id: string

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id'})
    user: Users

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}