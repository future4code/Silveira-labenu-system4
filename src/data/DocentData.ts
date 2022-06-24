import  DocentModel  from "../model/DocentModel";
import { BaseDatabase } from "./BaseDatabase";

const table: string = "docentes_labenu"
const specialtyTable: string = "especialidades_docentes"
const intersectionTable: string = "intermediate_especialidades"

class DocentData extends BaseDatabase{

    async insertDocent(docent: DocentModel): Promise<void> {

        await this.getConnection()
        .insert({
            id: docent.getId(),
            nome: docent.getNome(),
            email: docent.getEmail(),
            data_nasc: docent.getBirth(),
            turma_id: docent.getTurmaId(),
        }).into(table)
        for(let i: number = 0; i < docent.getEspecialidade().length; i++) {

            const result = await this.getConnection().from(specialtyTable)
                 .where({ nome: docent.getEspecialidade()[i].toUpperCase() })
          
             await this.getConnection()
                 .insert({
                     id_docente: docent.getId(),
                     id_especialidade: result[0].id
                 }).into(intersectionTable)
        }
    }
}
export default DocentData;