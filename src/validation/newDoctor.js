import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.name)){
        errors.name = "Este campo é obrigatório";
    }


    if(validator.isEmpty(data.email)){
        errors.email = "Este campo é obrigatório";
    }

    if(validator.isEmpty(data.username)){
        errors.username = "Este campo é obrigatório";
    }


    if(validator.isEmpty(data.password)){
        errors.password = "Este campo é obrigatório";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


