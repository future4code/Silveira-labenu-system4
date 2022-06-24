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
}

export default DocentController;