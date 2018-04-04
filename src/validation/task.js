import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validaTask(data) {
    let errors = {};

    if(validator.isEmpty(data.title)){
        errors.title = "This field is required";
    }

    if(validator.isEmpty(data.description)){
        errors.description = "This field is required";
    }

    if(validator.isEmpty(data.multi_link)){
        errors.multi_link = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function wrongCredentials() {
    let errors = {
        task_type: "Invalid",
        title: "Invalid",
        description: "Invalid",
        multi_link: "Invalid"
    };
    return {errors};
}


