import { app } from "./app";
import StudentController from "./endpoints/students/StudentController";
import DocentController from "./endpoints/docentes/DocentsController"; 
import TurmaController from './endpoints/turma/TurmaController'

const docentController = new DocentController()
const studentController = new StudentController()
const turmaController = new TurmaController()

app.post("/turma", turmaController.createTurma);
app.get("/turma", turmaController.getTurma);
app.put("/turma/:id", turmaController.putTurma);

app.post("/student", studentController.createStudent)
app.get("/student", studentController.getStudents)
app.get("/student/:nome", studentController.getStudentByName)
app.put("/student/edit", studentController.changeClassOfStudent)


app.post("/docent", docentController.createDocent)
app.get("/docent", docentController.getDocent)
app.put("/docent", docentController.changeDocentClass)








