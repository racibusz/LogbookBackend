import { Inject, Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { Airplane } from "./airpane.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AirplaneType } from "./airplaneType.entity";

@Injectable()
export class AirplaneService {

    constructor(
        @InjectRepository(Airplane)
        private readonly airplaneRepository:Repository<Airplane>,
        @InjectRepository(AirplaneType)
        private readonly airplaneTypeRepository: Repository<AirplaneType>,
    ) { }
    
    async saveAirplaneType(AirplaneTypes: Array<Record<string, any>>) {
        AirplaneTypes.forEach((type)=>{
            const airplaneType = new AirplaneType();
            airplaneType.model = type.ManufacturerCode+" "+type.ModelFullName;
            airplaneType.type = type.Designator;
            {type.EngineCount == 1 ? airplaneType.category="SE" : airplaneType.category="ME"}
            {type.EngineType == "Piston" ? airplaneType.category+="P" : airplaneType.category+="T"}
            {type.AircraftDescription == "LandPlane" ? airplaneType.category+="(L)" : airplaneType.category+="(S)"}
            // SEPL, MEPL SEPS MEPS obsłużone
            {type.EngineType == "Jet" ? airplaneType.category = "TR"+type.Designator : airplaneType.category=airplaneType.category}
            this.airplaneTypeRepository.save(airplaneType);
        })
        return("saved");
    }
    async getAirplaneModel(session: Record<string, any>, airplaneType: string){
        return(this.airplaneTypeRepository.find({where: { type: airplaneType }}));
    }
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
        return this.airplaneRepository.find({where: { userId: session.user.id }, relations: ["model"]});
    }
    async getAirplaneById(session: Record<string, any>, id: number) {
        if(!session.user){
            return null
        }
        return this.airplaneRepository.findOne({where: { userId: session.user.id, id }, relations: ["model"]});
    }
    
}