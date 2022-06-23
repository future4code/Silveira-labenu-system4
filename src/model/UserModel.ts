import moment from "moment"

export class UserModel {
    private id: string
    private nome: string
    private email: string
    private data_nasc: string
    private turma_id: string

    constructor(
        id: string,
        nome: string,
        email: string,
        data_nasc: string,
        turma_id: string
    ){
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.data_nasc = moment(data_nasc, "DD/MM/YYYY").format("YYYY-MM-DD")
        this.turma_id = turma_id
    }
    public getId():string{
        return this.id
    }

    public getNome():string{
        return this.nome
    }

    public getEmail(): string{
        return this.email
    }

    public getBirth(): string{
        return this.data_nasc
    }

    public getTurmaId(): string{
        return this.turma_id
    }
}