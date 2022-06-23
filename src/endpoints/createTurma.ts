import { Request, Response } from "express"
import { TurmaDatabase } from "../data/TurmaDatabase"
import { TurmaModel } from "../model/TurmaModel"

export default async function createTurma(req: Request, res: Response): Promise<void> {

  try {
    const { nome, modulo } = req.body
    const id = Date.now().toString()

    const turma = new TurmaModel(id, nome, modulo)

    const turmaDB = new TurmaDatabase()

    await turmaDB.insert(turma)

    res.status(201).send("Turma criada com sucesso")

  } catch (error: any) {
    res.status(500).end()
  }

}