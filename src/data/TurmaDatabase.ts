import { TurmaModel } from "../model/TurmaModel";
import { BaseDatabase } from "./BaseDatabase";

export class TurmaDatabase extends BaseDatabase{
    public async getAll(){
        try {
            const result = await BaseDatabase.connection("turma_labenu").select("*")
            return result
        } catch (error) {
            console.log(error)
            throw new Error("Error ")
        }
    }

    public async insert(turma: TurmaModel){
        try {
            await BaseDatabase.connection("turma_labenu")
            .insert({
                id: turma.getId(),
                nome: turma.getNome(),
                modulo: turma.getModulo()
            })
        } catch (error) {
            throw new Error("Error")
        }
    }

    public async update(turma: TurmaModel, id: id){
        try {
            await BaseDatabase.connection("turma_labenu")
            .update({
                modulo: turma.getModulo()
            })
        } catch (error) {
            throw new Error("Error")
        }
    }

}