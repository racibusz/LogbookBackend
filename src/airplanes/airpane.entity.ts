import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneType } from "./airplaneType.entity";

@Entity()
export class Airplane {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    @ManyToOne(()=>AirplaneType, (airplaneType) => airplaneType.id)
    model: number;
    @Column()
    type: string;
    @Column()
    registration: string;
    @Column()
    owner: string;
    @Column()
    pricePerHour: string;
    @Column()
    image: string;
}