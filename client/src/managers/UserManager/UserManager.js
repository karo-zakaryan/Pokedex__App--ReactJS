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
                    reject(err)
                })
            });
    };

    static login = user => {
        return axios
            .post('users/login', {
                email: user.email,
                password: user.password
            })
            .then(res => {
                console.log(res);
                localStorage.setItem('usertoken', res.data);
                return res.data;
            })
            .catch(err => {
                console.log(err);
            })
    };
}