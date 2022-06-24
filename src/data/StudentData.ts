import { Hobby } from "../endpoints/students/Hobby";
import { StudentModel } from "../model/StudentModel";
import { BaseDatabase } from "./BaseDatabase";

class StudentData extends BaseDatabase {

    async insertStudent(student: StudentModel): Promise<void> {
        // insere na tabela de estudantes
        await this.getConnection()
            .insert({
                id: student.getId(),
                nome: student.getNome(),
                email: student.getEmail(),
                data_nasc: student.getBirth(),
                turma_id: student.getTurmaId()
            })
            .into("estudantes_labenu")

        //para cada hobby do aluno
        for (let i = 0; i < student.getHobbies().length; i++) {

            //verifica se o hobby já existe na tabela
            const findHobby = await this.getConnection().raw(`SELECT nome FROM hobbies_estudantes WHERE nome LIKE "%${student.getHobbies()[i]}%"`)

            //se não existir o hobby cria na tabela
            if (!findHobby) {
                //cria um novo hobby
                let id = Date.now().toString();
                let newHobby = new Hobby(id, student.getHobbies()[i]);
                // await this.getConnection().insert(newHobby.getNomeHobby()).into("hobbies_estudantes");
                //adicionar o hobby na tabela de hobbies de estudantes
                await this.getConnection().insert({id: newHobby.getId(), nome: newHobby.getNomeHobby()}).into("hobbies_estudantes");
                //adiciona o id do hobby e o devido estudante na tabela intermediária
                await this.getConnection().insert({id_estudante: student.getId(), id_hobbie: newHobby.getId() }).into("intermediate_hobbies");
            }
            //se existir o hobby só associa o id do hobby com o do aluno
            if (findHobby) {
                let id = Date.now().toString();
                let newHobby = new Hobby(id, student.getHobbies()[i]);
                await this.getConnection().insert({id: newHobby.getId(), nome: newHobby.getNomeHobby()}).into("hobbies_estudantes");
                await this.getConnection().insert({id_estudante: student.getId(), id_hobbie: newHobby.getId()}).into("intermediate_hobbies");
            }

        }
    }

    async getAllStudents() {
        const result = await this.getConnection().select("*").from("estudantes_labenu")
        return result
    }
    async getStudantByName(nome:string) {
        const result = await this.getConnection().raw(`SELECT * FROM estudantes_labenu WHERE nome LIKE "%${nome}%" `)
        return result[0]
    }

    async changeClassOfStudent(estudante_id:string, turma_id:string){
        await this.getConnection().raw(`UPDATE estudantes_labenu SET turma_id = "${turma_id}" WHERE id = "${estudante_id}"`)
        
    }
}

export default StudentData