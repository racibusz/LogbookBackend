import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flight } from "./flights.entity";
import { Session } from "express-session";

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightsRepository: Repository<Flight>) { }
        addTime(beforestr: string, afterstr: string){
            if(beforestr === "" && afterstr === "") {
                return "";
            }
            if(beforestr === "") {
                return afterstr;
            }
            if(afterstr === "") {
                return beforestr;
            }
            const before = beforestr.split(":");
            const after = afterstr.split(":");
            const minutes = Number(before[1]) + Number(after[1]);
            const hours = Number(before[0]) + Number(after[0]) + Math.floor(minutes / 60);
            const newMinutes = minutes % 60;
            const newHours = hours % 24;
            return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        }

        summary = (flights: Flight[]) => {
            const result = {
                SinglePilotSeTime: "",
                SinglePilotMeTime: "",
                multiPilotTime: "",
                totalTime: "",
                landingsDay: "",
                landingsNight: "",
                flightConditionNightTime: "",
                flightConditionIfrTime: "",
                picTime: "",
                copilotTime: "",
                dualTime: "",
                instructorTime: "",
            }
            if(!flights || flights.length === 0) {
                return result;
            }
            flights.forEach((flight) => {
                result.SinglePilotSeTime = this.addTime(result.SinglePilotSeTime, flight.SinglePilotSeTime);
                result.SinglePilotMeTime = this.addTime(result.SinglePilotMeTime, flight.SinglePilotMeTime);
                result.multiPilotTime = this.addTime(result.multiPilotTime, flight.multiPilotTime);
                result.totalTime = this.addTime(result.totalTime, flight.totalTime);
                result.landingsDay = String(Number(result.landingsDay) + Number(flight.landingsDay));
                result.landingsNight = String(Number(result.landingsNight) + Number(flight.landingsNight));
                result.flightConditionNightTime = this.addTime(result.flightConditionNightTime, flight.flightConditionNightTime);
                result.flightConditionIfrTime = this.addTime(result.flightConditionIfrTime, flight.flightConditionIfrTime);
                result.picTime = this.addTime(result.picTime, flight.picTime);
                result.copilotTime = this.addTime(result.copilotTime, flight.copilotTime);
                result.dualTime = this.addTime(result.dualTime, flight.dualTime);
                result.instructorTime = this.addTime(result.instructorTime, flight.instructorTime);
            })
            return result;
        }
        async findAllPaged(session, pageNumber){
            if(!session.user){
                return []
            }
            const allFlights = await this.flightsRepository.find({where: {userId: session.user.id}, order: {flightDate: "ASC"}})
            const result: Flight[][] = [];
            for (let i = 0; i < allFlights.length; i += 10) {
                result.push(allFlights.slice(i, i + 10));
            }
            return {pageNumber: pageNumber, pageMax: result.length-1, flights: result[pageNumber], summaryThisPage: this.summary(result[pageNumber]), summaryBeforePage: this.summary(allFlights.slice(0, pageNumber*10)), summaryTotal: this.summary(allFlights.slice(0, pageNumber*10 + result[pageNumber].length))}; 
        }
        async saveFlight(flight: Flight, session: Record<string, any>) {
            flight.userId = session.user.id;
            return this.flightsRepository.save(flight);
        }
        async deleteFlight(flightId: number, session: Record<string, any>) {
            if(!session.user) {
                return [];
            }
            const flight = await this.flightsRepository.findOne({where: {id: flightId}});
            if(!flight) {
                return {message: 'Flight not found'};
            }
            if(flight.userId !== session.user.id) {
                return {message: 'You are not authorized to delete this flight'};
            }
            return this.flightsRepository.delete(flightId);
        }
        async modifyFlight(flightId:number, session: Record<string, any>, newFlight: Flight) {
            if(!session.user) {
                return [];
            }
            const flightToModify = await this.flightsRepository.findOne({where: {id: flightId}});
            if(!flightToModify) {
                return {message: 'Flight not found'};
            }
            if(flightToModify.userId !== session.user.id) {
                return {message: 'You are not authorized to modify this flight'};
            }
            return this.flightsRepository.update(flightId, newFlight);
        }
    }