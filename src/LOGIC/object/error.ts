
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
    }

}


export class DatabaseError extends Error{
    constructor(){
        super(ErrorName['DatabaseErrors']);
    }

}

export class NoRecordsFoundError extends Error{
    constructor(){
        super(ErrorName['NoRecordsFoundError']);
    }
}

export class MaxTryError extends Error{
    constructor(){
        super(ErrorName['MaxTryError']);

    }
}

export class incorrectDataError extends Error{
    constructor(){
        super(ErrorName['IncorrectDataError']);
    }
}

