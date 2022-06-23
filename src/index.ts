import { app } from "./app";
import { AddressInfo } from 'net'
import dotenv from 'dotenv'
import StudentController from "./endpoints/students/StudentController";

dotenv.config()


const studentController = new StudentController()
app.post("/student", studentController.createStudent)

app.post("/student", studentController.getStudents)














const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});