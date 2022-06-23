import { app } from "./app";
import { Request, Response } from "express"
import createTurma from './endpoints/createTurma'
import searchTurma from './endpoints/searchTurma'
import changeTurma from "./endpoints/changeTurma";
import { AddressInfo } from 'net'
import StudentController from "./endpoints/students/StudentController";
import { DocentController } from "./endpoints/docentes/DocentsController";


app.post("/turma", createTurma);

app.get("/turma", searchTurma);

app.put("/turma/id", changeTurma);


const docentController = new DocentController()
const studentController = new StudentController()

app.post("/student", studentController.createStudent)

app.post("/student", studentController.getStudents)

app.post("/docent", docentController.createDocent)














