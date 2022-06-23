import { DocentModel } from "../model/DocentModel";
import { BaseDatabase } from "./BaseDatabase";

const table: string = "docentes_labenu"

class DocentData extends BaseDatabase{

    async insertDocent(docent: DocentModel): Promise<void> {

        await this.getConnection()
        .insert({
            id: docent.getId(),
            nome: docent.getNome(),
            email: docent.getEmail(),
            data_nasc: docent.getBirth(),
            turma_id: docent.getTurmaId(),
        }).into()
    }
}