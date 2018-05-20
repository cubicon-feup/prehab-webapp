
export default function validateInput(data) {

    let task_errors = [];
    let freq_errors = [];

    let isValid = true;

    data.forEach(element => {
        if(element.task_id === ""){
            isValid = false;
            task_errors.push( {activity: "Escolher Actividade"} )
        }
        else
            task_errors.push( {activity: ""} )

        if(element.times_per_week === ""){
            isValid = false;
            freq_errors.push( {freq: "Escolher Freq"} )
        }

    });

    return {
        isValid,
        errors: [...task_errors, ...freq_errors]
    };
}


