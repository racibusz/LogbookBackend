import { Controller, Get, Post, Body, Session, Delete, Param, Put } from "@nestjs/common";
import { AirplaneService } from "./airplane.service";
import { Airplane } from "./airpane.entity";
import * as fs from 'fs';
import { AirplaneType } from "./airplaneType.entity";

@Controller('airplanes')
export class AirplanesController {
    constructor(private readonly airplaneService: AirplaneService) { }
    // @Post("types")
    // async saveAirplaneTypes(@Body() AirplaneTypes: Array<AirplaneType>) {
    //     return this.airplaneService.saveAirplaneType(AirplaneTypes);
    // }
    // Just to import airplane types from JSON file
    @Post()
    async saveAirplane(@Session() session: Record<string, any>, @Body() airplane:Airplane){
        return this.airplaneService.saveAirplane(session, airplane);
    }
    @Get()
    async getAllAirplanes(@Session() session: Record<string, any>){
        return this.airplaneService.getAirplanes(session);
    }
    @Get("/type/:type")
    async getType(@Session() session: Record<string, any>, @Param("type") type: string){
        return this.airplaneService.getAirplaneModel(session, type)
    }
    @Get(":id")
    async getAirplaneById(@Session() session: Record<string, any>, @Param("id") id: number) {
        return this.airplaneService.getAirplaneById(session, id);
    }
}