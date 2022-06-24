import { app } from "./app";
import { Request, Response } from "express"
import { AddressInfo } from 'net'
import StudentController from "./endpoints/students/StudentController";
import { DocentController } from "./endpoints/docentes/DocentsController";
import TurmaController from './endpoints/turma/TurmaController'

const docentController = new DocentController()
const studentController = new StudentController()
const turmaController = new TurmaController()

app.post("/turma", turmaController.createTurma);

app.get("/turma", turmaController.getTurma);

app.put("/turma/id", turmaController.putTurma);

app.post("/student", studentController.createStudent)

app.post("/student", studentController.getStudents)

app.post("/docent", docentController.createDocent)














