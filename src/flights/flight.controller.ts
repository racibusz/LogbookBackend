import { Controller, Get, Post, Body, Session, Delete, Param, Put } from "@nestjs/common";
import { FlightsService } from "./flights.service";
import { Flight } from "./flights.entity";

@Controller('flight')
export class FLightsController {
    constructor(private readonly flightsService: FlightsService) { }
    @Get(':pageNumber') 
    async getAllFlight(@Session() session: Record<string, any>, @Param("pageNumber") pageNumber: number) {
        if(pageNumber == null){
            pageNumber = 1;
        }
        return this.flightsService.findAllPaged(session, pageNumber);
    }
    @Get()
    async getAllFlightUnPaged(@Session() session: Record<string, any>){
        return this.flightsService.findAllPaged(session, 0);
    }
    @Post()
    async saveFlight(@Session() session: Record<string, any>, @Body() flight: Flight) {
        return this.flightsService.saveFlight(flight, session);
    }
    @Post("many")
    async saveManyFlights(@Session() session: Record<string, any>, @Body() flights: Array<Flight>){
        flights.forEach((f, i)=>{
            this.flightsService.saveFlight(f, session);
        })
        return("saved");
    }
    @Post('modify/:id')
    async modifyFlight(@Session() session: Record<string, any>, @Param('id') id: number, @Body() newFlight: Flight) {
        return this.flightsService.modifyFlight(id, session, newFlight);
    }
    @Delete(':id')
    async deleteFlight(@Session() session: Record<string, any>, @Param('id') id: number) {
        return this.flightsService.deleteFlight(id, session);
    }

}