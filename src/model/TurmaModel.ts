export class TurmaModel {
    constructor(
        private id: string,
        private nome: string,
        private modulo: string,
    ){}
    public getId():string{
        return this.id
    }

    public getNome():string{
        return this.nome
    }

    public getModulo(): string{
        return this.modulo
    }

}