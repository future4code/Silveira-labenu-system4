import { UserModel } from "./UserModel";

class DocentModel extends UserModel {
    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: string,
        private especialidades: string[]
    ){ 
        super(id, nome, email, data_nasc, turma_id);
        this.especialidades = especialidades
    }
  
    public getEspecialidade(): string[]{
        return this.especialidades
    }
}

export default DocentModel;