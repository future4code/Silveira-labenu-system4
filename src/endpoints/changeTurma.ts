import { Request, Response } from "express"
import { TurmaDatabase } from "../data/TurmaDatabase"

export default async function changeTurma(req: Request, res: Response): Promise<void> {
    try {
        const { modulo } = req.body
        const changeDB = new TurmaDatabase()

        await changeDB.update(modulo, req.params.id)
        
        res.status(201).send("Módulo atualizado com sucesso!")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}



