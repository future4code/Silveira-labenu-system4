import { UserModel } from "../model/UserModel";
import { BaseDatabase } from "./BaseDatabase";

class StudentData extends BaseDatabase{

    async insertStudent (student:UserModel):Promise<void>{
        await this.getConnection()
        .insert({
            id: student.getId(),
            nome: student.getNome(),
            email: student.getEmail(),
            data_nasc: student.getBirth(),
            turma_id: student.getTurmaId()
        })
            .into("estudantes_labenu")
    }

    async getAllStudents(){
        const result = await this.getConnection().select("*").from("estudantes_labenu")
        return result
    }

}

export default StudentData