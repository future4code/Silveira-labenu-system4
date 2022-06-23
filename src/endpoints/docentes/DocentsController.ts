import { Request, Response } from 'express'
import { DocentData } from '../../data/DocentData'
import { DocentModel } from '../../model/DocentModel'

enum ESPECIALITIES {
    JS = "JS",
    CSS = "CSS",
    POO = "POO",
    REACT = "REACT",
    JAVASCRIPT = "JAVASCRIPT",
    TYPESCRIPT = "TYPESCRIPT"
}

export class DocentController{
    async createDocent(req: Request, res: Response) {
        try{
            const{nome, email, data_nasc, turma_id, especialidade} = req.body
            const specialty: string = especialidade.toLowerCase() as string
            const docentId: string = Date.now().toString()
            const specialtyId: string = Date.now().toString()

            if(!nome || !email || !data_nasc || !turma_id || !especialidade) {

                res.statusCode = 406;
                throw new Error("One of the fields is empty. Please, check the values.")

            }
            if(specialty !== ESPECIALITIES.CSS && specialty && ESPECIALITIES.JS && specialty !== ESPECIALITIES.CSS 
                && specialty !== ESPECIALITIES.POO && specialty !== ESPECIALITIES.JAVASCRIPT && specialty !== ESPECIALITIES.TYPESCRIPT) {
                   
                    res.statusCode = 422;
                    throw new Error("The specialty doesn't match the acepptable values. Check the documentation.")
            }

            const docent = new DocentModel(docentId, nome, email, data_nasc, turma_id, specialty)
            const docentData = new DocentData()
            const answer = await docentData.insertDocent(docent)

            res.status(201).send({message: "Teacher registered successfully."})
        } catch(error: any) {
            res.send({message: error.message})
        }
    }
}