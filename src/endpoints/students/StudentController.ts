import { Request, Response } from "express";
import StudentData from "../../data/StudentData";
import { UserModel } from "../../model/UserModel";

class StudentController {

        async createStudent(req: Request, res: Response){
            try{
                const {nome, email, data_nasc, turma_id} = req.body

                if(!nome || !email || !data_nasc || !turma_id){
                    throw new Error("Todos os parâmetros devem ser passados!");
                    
                }
                const id = Date.now().toString()
                const user = new UserModel(id,nome,email,data_nasc,turma_id)

                const studentData = new StudentData()

                const answer = await studentData.insertStudent(user)
                res.status(200).send({message: answer})
            } catch(err:any){
                res.status(500).send({message: err.message})
            }
        }
        async getStudents(req: Request, res: Response){
            try{
                const studentData = new StudentData()
                const allStudents = await studentData.getAllStudents()
                if(!allStudents.length){
                    throw new Error("Ainda não há estudantes cadastrados!");
                }
                res.status(200).send(allStudents)
            } catch(err:any){
                res.status(500).send({message: err.message})
            }
        }
}

export default StudentController


// **→ Criar estudante;**
// 💡 Para criar um estudante, os dados enviados ao banco precisam ser uma **instância de classe** Estudante;

// **→ Buscar estudantes através do nome;**

// **→ Mudar estudante de turma;**