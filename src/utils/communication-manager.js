/**
 * Authenticates an user.
 * @param {*} userID User id.
 */
export function authenticateUser(username, password) {
	return new Promise(function (resolve, reject) {

		let requestUrl = "http://ec2-35-176-153-210.eu-west-2.compute.amazonaws.com/api/login/";

		let requestOptions = {
			uri: requestUrl,
			method: "POST",
			headers: {
				'Authorization': 'Basic ',
				'Content-Type': 'application/json',
				'pragma': 'no-cache',
				'cache-control': 'no-cache'
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