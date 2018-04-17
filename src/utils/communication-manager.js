/**
 * Authenticates an user.
 * @param {*} username User id.
 * @param {*} password User password.
 */
export function authenticateUser(username, password) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com/api/login/";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Authorization': 'Basic ',
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache',
				'Platform' : 'web'
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

        let requestUrl = "/authentication";

        let requestOptions = {
            uri: requestUrl,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + secret,
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'Platform' : 'web'
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

        let requestUrl = "http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com/api/task/";

        let requestOptions = {
            uri: requestUrl,
            method: "POST",
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'jwt': secret,
                'Platform' : 'web'
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

        let requestUrl = "http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com/api/task/";

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

export function getPatientList(secret) {
    return new Promise(function (resolve, reject) {

        let requestUrl = "http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com/api/patient/";

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

