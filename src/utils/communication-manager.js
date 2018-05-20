/**
 * Authenticates an user.
 * @param {*} username User id.
 * @param {*} password User password.
 */

const URL = "http://prehab.cubicon.xyz:8000";

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
        };
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
        };

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
        };
        fetch(requestUrl, requestOptions).then(function (response) {
                if(parseInt(response.status/100, 10) === 2){
                    return resolve(response.json());
                } else {

                    return reject(response.json());
                }

            }, function (error) {
                return reject(error.json());
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
        };
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


export function getDoctorList(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl =  URL + "/api/doctor/";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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


export function getDoctorById(id, secret) {
    return new Promise(function (resolve, reject) {

        console.log(id);

        let requestUrl =  URL + "/api/doctor/"+id;

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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


export function createNewDoctor(secret, doctor_caracteristics) {
    return new Promise(function (resolve, reject) {


        let requestUrl = URL +"/api/doctor/";


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
                "name":doctor_caracteristics.name,
                "email": doctor_caracteristics.email,
                "username" : doctor_caracteristics.username,
                "password" : doctor_caracteristics.password
            })
        };

        fetch(requestUrl, requestOptions).then(function (response) {
                if(parseInt(response.status/100, 10) === 2){
                    return resolve(response.json());
                } else {

                    return reject(response.json());
                }

            }, function (error) {
                return reject(error.json());
            });
    });
}


export function getPrehabList(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl =  URL + "/api/prehab/";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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


export function getPrehabById(id, secret) {
    return new Promise(function (resolve, reject) {

        console.log(id);

        let requestUrl =  URL + "/api/prehab/"+id;

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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


export function getPatientList(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl =  URL + "/api/patient/";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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


export function createNewPrehab(secret, prehab_caracteristics) {
    return new Promise(function (resolve, reject) {


        let requestUrl = URL +"/api/prehab/";

        console.log(prehab_caracteristics);


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
                "patient_id": prehab_caracteristics.idPatient,
                "task_schedule_id": prehab_caracteristics.idPlan,
                "surgery_date": prehab_caracteristics.surgeryDate,
                "init_date": prehab_caracteristics.startDate,

            })
        };

        fetch(requestUrl, requestOptions).then(function (response) {

        if(parseInt(response.status/100, 10) === 2){
            return resolve(response.json());
        } else {

            return reject(response.json());
        }



        }, function (error) {
            return reject(error.json());
        });
    });
}

/**
 * Creates a New Patient
 * @param {*} .
 */
export function createNewPatient(secret, patient_caracteristics) {
    return new Promise(function (resolve, reject) {


        let requestUrl = URL +"/api/patient/";


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
                "age": Number(patient_caracteristics.age),
                "height": Number(patient_caracteristics.height),
                "weight": Number(patient_caracteristics.weight),
                "sex": patient_caracteristics.sex,
                "constraints": patient_caracteristics.constraints,
                "email": patient_caracteristics.email,
                "task_schedule_plan_id": "1"
            })
        };

        fetch(requestUrl, requestOptions).then(function (response) {
            if(parseInt(response.status/100, 10) === 2){
                return resolve(response.json());
            } else {

                return reject(response.json());
            }

        }, function (error) {
            return reject(error.json());
        });
    });
}


export function getPatientById(id, secret) {
    return new Promise(function (resolve, reject) {

        console.log(id);

        let requestUrl =  URL + "/api/patient/"+id;

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
            }
        };
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
        };

        fetch(requestUrl, requestOptions).then(function (response) {
            if(parseInt(response.status/100, 10) === 2){
                return resolve(response.json());
            } else {

                return reject(response.json());
            }

        }, function (error) {
            return reject(error.json());
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
        };

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

export function sendNutrition(token, title, restrictions, type, description) {
	return new Promise(function (resolve, reject) {

		let requestUrl = URL + "/api/meal/";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Authorization': 'Basic ',
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache',
				'platform': 'web',
                'jwt': token
			},
			body: JSON.stringify({
                "title": title,
                "constraint_types": restrictions,
                "meal_type_id": type,
                "description": description
            })
		};
		fetch(requestUrl, requestOptions).then(function (response) {
			if(parseInt(response.status/100, 10) === 2){
                return resolve(response.json());
            } else {

                return reject(response.json());
            }

        }, function (error) {
            return reject(error.json());
        });
	});
}

export function cancelPrehab(token, prehabId) {
    return new Promise(function (resolve, reject) {
        let requestUrl =  URL + "/api/prehab/cancel/" + prehabId + "/";
        let requestOptions = {
            uri: requestUrl,
            method: "PUT",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': token,
                'platform': 'web'
            },
        };
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

