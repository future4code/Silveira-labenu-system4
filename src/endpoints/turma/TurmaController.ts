import { Request, Response } from "express";
import { TurmaData } from "../../data/TurmaData";
import { TurmaModel } from "../../model/TurmaModel";

class TurmaController {
    async createTurma(req: Request, res: Response): Promise<void> {
        try {
            const { nome, modulo } = req.body
            const id = Date.now().toString()

            const turma = new TurmaModel(id, nome, modulo)

            const turmaDB = new TurmaData()

            await turmaDB.insert(turma)

            res.status(201).send("Turma criada com sucesso")

        } catch (error: any) {
            res.status(500).end()
        }
    }

    async getTurma(req: Request, res: Response): Promise<void> {
        try {
            const turmaDB = new TurmaData()
    
            const turmas = await turmaDB.getAll()
    
            res.send(turmas)
    
        } catch(error:any) {
            res.status(500).send(error.message)
        }
    }

    async putTurma(req: Request, res: Response): Promise<void> {
        try {
            const { modulo } = req.body
            const changeDB = new TurmaData()
    
            // await changeDB.update(modulo, req.params.id)
    
            res.status(201).send("Módulo atualizado com sucesso!")
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

}

export default TurmaController