export class Hobby {

    private id: string
    private nome: string;

    constructor(id:string, nome:string){
        this.id = id;
        this.nome = nome;
    }

    public setHobby(hobby: string){
       this.nome = hobby;
    }

    public getId(){
        return this.id;
     }
     public getNomeHobby(){
        return this.nome;
     }
}