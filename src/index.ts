import { app } from "./app";
import { Request, Response } from "express"
import createTurma from './endpoints/createTurma'
import searchTurma from './endpoints/searchTurma'
import changeTurma from "./endpoints/changeTurma";


app.post("/turma", createTurma);

app.get("/turma", searchTurma);

app.put("/turma/id", changeTurma);





