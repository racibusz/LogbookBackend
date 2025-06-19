import { Controller, Get, Post, Body, Session, Delete, Param, Put } from "@nestjs/common";
import { AirplaneService } from "./airplane.service";
import { Airplane } from "./airpane.entity";

@Controller('airplanes')
export class AirplanesController {
    constructor(private readonly airplaneService: AirplaneService) { }
    @Post()
    async saveAirplane(@Session() session: Record<string, any>, @Body() airplane:Airplane){
        return this.airplaneService.saveAirplane(session, airplane);
    }
    @Get()
    async getAllAirplanes(@Session() session: Record<string, any>){
        return this.airplaneService.getAirplanes(session);
    }
}