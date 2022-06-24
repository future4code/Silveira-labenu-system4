import { Request, Response } from "express";
import StudentData from "../../data/StudentData";
import { StudentModel } from "../../model/StudentModel";


class StudentController {

        async createStudent(req: Request, res: Response){
            try{
                const {nome, email, data_nasc, turma_id, hobbies} = req.body
                

                //valida se o formato da data é DD/MM/YYYY
                const validateDate = (date: any): boolean => {
                    let regex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
                 
                    return regex.test(date);
                 }

                if(!nome || !email || !data_nasc || !turma_id || !hobbies){
                    throw new Error("Todos os parâmetros devem ser passados!");
                    
                }
                if(!validateDate(data_nasc)){
                    throw new Error('a Data deve ser no formato DD/MM/AAAA')
                 }
                const id = Date.now().toString()
                //cria uma instância para o estudante
                const student = new StudentModel(id,nome,email,data_nasc,turma_id, hobbies)
                //cria uma instância para a conexão com o banco de dados
                const studentData = new StudentData()

                //verificar se estudante existe
                const allStudents = await studentData.getAllStudents()
                const findStudent = allStudents.filter((i)=>{
                    return i.email === student.getEmail()
                })
                console.log(findStudent);
                
                if(findStudent.length > 0){
                    throw new Error("Já existe um usuário cadastrado com esse email!");                    
                }
                if(findStudent.length === 0){
                //faz o envio do aluno para a função de inserir Estudante da conexão com o banco de dados
                await studentData.insertStudent(student)
                res.status(200).send({message: `Usuário(a) ${student.getNome()} criado(a) com sucesso!`})
                }
                
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

        async getStudentByName(req: Request, res: Response){
            try{
                const name = req.params.nome
                if(!name){
                    throw new Error("O nome do usuário deve ser passado como parâmetro na URL"); 
                }
                const studentData = new StudentData()
                const findSutdent = await studentData.getStudantByName(name)
                if(!findSutdent){
                    throw new Error("Estudante não encontrado!");
                }
                res.status(200).send(findSutdent)
            } catch(err:any){
                res.status(500).send({message: err.message})
            }
        }

        async changeClassOfStudent (req: Request, res: Response){
            try { 
            const { estudante_id, turma_id } = req.body;      
         
            if(!estudante_id || !turma_id){
                throw new Error("Todos os parâmetros devem ser passados!");
            }
            
            const studentData = new StudentData()
            await studentData.changeClassOfStudent(estudante_id, turma_id)
               res.status(200).send('Turma alterada com sucesso !');
         
            }catch(err:any){
         
               res.status(500).send(err.sqlMessage || err.message);
               
            }
         }
}

export default StudentController
