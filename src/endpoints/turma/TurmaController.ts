import { Request, Response } from "express";
import { TurmaData } from "../../data/TurmaData";
import { TurmaModel } from "../../model/TurmaModel";

class TurmaController {
    async createTurma(req: Request, res: Response): Promise<void> {
        try {
            const { nome } = req.body
            const modulo = '0'
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

        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    async putTurma(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const { modulo } = req.body
            if (!id) {
                throw new Error("ID deve ser passado!");
            }

            if (modulo === '0' || modulo === '1' || modulo === '2' || modulo === '3' || modulo === '4' || modulo === '5' || modulo === '6') {
                res.status(201).send("Módulo atualizado com sucesso!")
            } else {
                throw new Error("Modulo não pode ser maior que 6");
            }

            const changeDB = new TurmaData()
            await changeDB.update(modulo, id)

        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

}

export default TurmaController