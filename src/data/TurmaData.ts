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

    public async update(modulo: TurmaModel, id: string) {
        console.log('ID', id)
        try {
            await this.getConnection().from("turma_labenu")
                .update({
                    modulo: modulo
                })
                .where('id', id)
            }
            
            catch(error){
                throw new Error("Error")
            }
        }

}