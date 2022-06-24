import { app } from "./app";
import { AddressInfo } from 'net'
import dotenv from 'dotenv'
import StudentController from "./endpoints/students/StudentController";
// import { DocentController } from "./endpoints/docentes/DocentsController";

dotenv.config()

// const docentController = new DocentController()
const studentController = new StudentController()

app.post("/student", studentController.createStudent)

app.get("/student", studentController.getStudents)
<<<<<<< HEAD
app.get("/student/:nome", studentController.getStudentByName)
app.put("/student/edit", studentController.changeClassOfStudent)
=======
>>>>>>> master


// app.post("/docent", docentController.createDocent)









const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});