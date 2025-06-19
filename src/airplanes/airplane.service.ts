import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Airplane } from "./airpane.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AirplaneService {

    constructor(
        @InjectRepository(Airplane)
        private readonly airplaneRepository:Repository<Airplane>
    ) { }
    
    async saveAirplane(session: Record<string, any>, airplane: Airplane) {
        if(!session.user){
            return []
        }
        airplane.userId = session.user.id;
        return this.airplaneRepository.save(airplane)
    }
    async getAirplanes(session: Record<string, any>){
        if(!session.user){
            return []
        }
        return this.airplaneRepository.find({where: { userId: session.user.id }});
    }

    
}