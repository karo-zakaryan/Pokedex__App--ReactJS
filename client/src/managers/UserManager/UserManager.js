import axios from "axios";

export default class UserManager {
    static register = newUser => {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post('users/register', {
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email,
                        password: newUser.password
                    })
                    .then(res => {
                        if (res.data.error) {
                            reject(res.data.error)
                        }
                        resolve(res);
                    }).catch(err => {
                    reject(err);
                })
            });
    };

    static login = user => {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post('users/login', {
                        email: user.email,
                        password: user.password
                    })
                    .then(res => {
                        if (res.data.error) {
                            reject(res.data.error);
                        }
                        localStorage.setItem('usertoken', res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
    };
}