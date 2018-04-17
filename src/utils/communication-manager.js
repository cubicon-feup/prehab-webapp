/**
 * Authenticates an user.
 * @param {*} username User id.
 * @param {*} password User password.
 */

const URL = "http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com";

export function authenticateUser(username, password) {
    return new Promise(function (resolve, reject) {

        let requestUrl = URL + "/api/login/";

        let requestOptions = {
            uri: requestUrl,
            method: "POST",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'platform': 'web'
            },
            body: JSON.stringify({ "username": username, "password": password })
        }
        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

/**
 * Gets the authentication info.
 * @param {*} secret Secret (access token) used to authenticate the user.
 */
export function getAuthInfo(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl = URL + "/authentication";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + secret,
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'platform': 'web'
            }
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

/**
 * Creates a new Task via POST REQUEST
 * @param {*} title Task Title.
 * @param {*} description Task description.
 * @param {*} multi_link Task multimedia Link.
 * @param {*} type Task Type.
 */
export function createTask(title, description, multi_link, type, secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl =  URL + "/api/task/";

        let requestOptions = {
            uri: requestUrl,
            method: "POST",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'platform': 'web'
            },
            body: JSON.stringify({ "title": title, "description": description, "multimedia_link": multi_link, "task_type_id": type })
        }
        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 201) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}


/**
 * Get List of Available Task
 * @param {*} .
 */
export function getTaskList(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl =  URL + "/api/task/";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'platform': 'web'
            }
        }
        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

/**
 * Creates a New Patient
 * @param {*} .
 */
export function createNewPatient(secret, patient_caracteristics) {
    return new Promise(function (resolve, reject) {

        let requestUrl = URL +"/api/web/register_patient/";

        let requestOptions = {
            uri: requestUrl,
            method: "POST",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'platform': 'web'
            },
            body: JSON.stringify({
                "age": patient_caracteristics.age,
                "height": patient_caracteristics.height,
                "weight": patient_caracteristics.weight,
                "sex": patient_caracteristics.sex,
                "constraints": patient_caracteristics.constraints,
                "email": patient_caracteristics.email,
                "task_schedule_plan_id": "1"
            })
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}


/**
 * Creates a New Plan
 * @param {*} .
 */
export function createNewPlan(secret, planTitle, planWeek, plan) {
    return new Promise(function (resolve, reject) {

        let requestUrl = URL + "/api/schedule/task/full/";

        let requestOptions = {
            uri: requestUrl,
            method: "POST",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'platform': 'web'
            },
            body: JSON.stringify({
                "title": planTitle,
                "number_of_weeks": planWeek,
                "weeks": plan
            })
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 201) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

/**
 * Get Plan
 * @param {*} .
 */
export function getDoctorPlan(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl = URL + "/api/schedule/task/";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'platform': 'web'
            },
        }

        fetch(requestUrl, requestOptions).then(function (response) {
            if (response.status === 200) {
                return resolve(response.json());
            } else {
                return reject(Error("An error has occurred! Please try again."));
            }
        }, function (error) {
            return reject(error);
        });
    });
}

