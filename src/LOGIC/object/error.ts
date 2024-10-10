
const ErrorName ={
    'ConnectionError':'Ha ocurrido un error al conectarse a la base de datos.',
    'DatabaseError':'Ha ocurrido un error al manipular la base de datos.',
    'NoRecordsFoundError': 'No se han encontrado ocurrencias en la base de datos.',
    'MaxTryError':'Ya superaste el limite de intentos, pruebe mas tarde.',
    'IncorrectDataError':'Los datos ingresados son incorrectos.'

}



export class ConnectionError extends Error{
    constructor(){
        super(ErrorName['ConnectionError']);
        this.name = 'ConnectionError';
    }

}


export class DatabaseError extends Error{
    constructor(){
        super(ErrorName['DatabaseErrors']);
        this.name = 'DatabaseErrors';

    }

}

export class NoRecordsFoundError extends Error{
    constructor(){
        super(ErrorName['NoRecordsFoundError']);
        this.name = 'NoRecordsFoundError';

    }
}

export class MaxTryError extends Error{
    constructor(){
        super(ErrorName['MaxTryError']);
        this.name = 'MaxTryError';

    }
}

export class IncorrectDataError extends Error{
    constructor(){
        super(ErrorName['IncorrectDataError']);
        this.name = 'IncorrectDataError';

    }
}

