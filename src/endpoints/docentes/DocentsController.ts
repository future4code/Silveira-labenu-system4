import { Request, Response } from 'express'
import  DocentData  from '../../data/DocentData'
import  DocentModel  from '../../model/DocentModel'

class DocentController{
    async createDocent(req: Request, res: Response) {
        try{
            const{nome, email, data_nasc, turma_id, especialidades} = req.body
            const docentId: string = Date.now().toString()

            if(!nome || !email || !data_nasc || !turma_id || especialidades.length <1) {
                
                res.statusCode = 406;
                throw new Error("One of the fields is empty. Please, check the values.")

            }
            
            const docent = new DocentModel(docentId, nome, email, data_nasc, turma_id, especialidades)
            const docentData = new DocentData()
            const answer = await docentData.insertDocent(docent)

            res.status(201).send({message: "Teacher registered successfully."})
        } catch(error: any) {
            res.send({message: error.message})
        }
    }

    async getDocent(req: Request, res: Response): Promise<any> {
        try{
            const nome: string = req.query.nome as string
            if (!nome) {
                const docentData: DocentData = new DocentData()
                const allTeachers = await docentData.getAllDocents()

                if(!allTeachers) {
                    res.statusCode = 404;
                    throw new Error("There´s any teacher registered in our system yet. :(")
                }
                res.status(200).send({message: "No search were send, so here are all the teachers in our system.",
                                    data: allTeachers})
            }

            const docentData: DocentData = new DocentData()
            const teachersResult = await docentData.getDocentByName(nome)

            if(!teachersResult) {
                res.statusCode = 404;
                throw new Error("No matches werw found, please check the search field.")
            }
            res.status(200).send({data: teachersResult})
        } catch(error: any) {
            res.send(error.message)
        }
    }

    async changeDocentClass(req: Request, res: Response):Promise<void>{
        const {teacher_id, turma_id} = req.body
        try{
            if(!turma_id || !teacher_id) {
                res.statusCode = 406;
                throw new Error("All the params must be filled, please check your request.")
            }
            const docentData: DocentData = new DocentData()
            const updateClass = docentData.changeDocentClass(teacher_id, turma_id)

            res.status(201).send({message: "Updated successfully!"})
        } catch(error: any) {
            res.send(error.message)
        }
        } 
    }

export default DocentController;