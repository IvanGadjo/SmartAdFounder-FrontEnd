import React from 'react';
import Axios from 'axios';

const ApiService = () => {

    const getUserInterests = (userId) => {
        Axios.get(`localhost:8080/api/userInterests/all/byUser/${userId}`)
        .then(res => res.data())
        .catch(err => console.log(err));
    }

    const createUser = (user) => {
        Axios.post("localhost:8080/api/users/createUser", {
             body: user
        })
        .then(res => res.data())
        .catch(err => console.log(err));
    }

    const createUserInterest = (userInterest, userId) => {
        Axios.post("localhost:8080/api/userInterests/createUserInterest", {
            body: {userInterest, userId}
        })
        .then(res => res.data())
        .catch(err => console.log(err));
    }

    const editUserInterests = (newUserInterest, userId) => {
        Axios.patch("localhost:8080/api/userInterests/editUserInterest", {
            body: {newUserInterest, userId}
        })
        .then(res => res.data)
        .catch(err => console.log(err));
    }

}

export default ApiService;
