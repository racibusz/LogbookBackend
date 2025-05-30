import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseService {
    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSource: DataSource,
    ) { }
    async getRepository(entity: Function) {
        return this.dataSource.getRepository(entity);
    }
}