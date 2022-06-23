import {Request, Response} from "express"
import { TurmaDatabase } from "../data/TurmaDatabase"

export default async function searchTurma(req: Request, res: Response): Promise<void> {
    try {
        const turmaDB = new TurmaDatabase()

        const turmas = await turmaDB.getAll()

        res.send(turmas)

    } catch(error:any) {
        res.status(500).send(error.message)
    }

}