import { TurmaModel } from "../model/TurmaModel";
import { BaseDatabase } from "./BaseDatabase";

export class TurmaData extends BaseDatabase {
    public async getAll() {
        try {
            const result = await this.getConnection().select("*").from("turma_labenu")
            return result
        } catch (error) {
            console.log(error)
            throw new Error("Error ")
        }
    }

    public async insert(turma: TurmaModel) {
        try {
            await this.getConnection()
                .insert({
                    id: turma.getId(),
                    nome: turma.getNome(),
                    modulo: turma.getModulo()
                })
                .into("turma_labenu")

        } catch (error) {
            throw new Error("Error")
        }
    }

    public async update(turma: TurmaModel) {
        try {
            await this.getConnection()
                .update({
                    modulo: turma.getModulo()
                })
                .into("turma_labenu")

        } catch (error) {
            throw new Error("Error")
        }
    }

}