import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airplane {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    model: string;
    @Column()
    registration: string;
    @Column()
    owner: string;
    @Column()
    pricePerHour: string;
    @Column()
    category: string;
}