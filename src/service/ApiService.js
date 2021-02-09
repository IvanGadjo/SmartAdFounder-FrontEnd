import React from 'react';
import Axios from '../axios/axios_app';
// import Axios from 'axios';

const ApiService = {

     getUserInterests = (userId) => {
        Axios.get(`/api/userInterests/all/byUser/${userId}`)
        .then(res => res.data())
        .catch(err => console.log(err));
    },

    createUser = (user) => {
        Axios.post("/api/users/createUser", {
             body: user
        })
        .then(res => res.data())
        .catch(err => console.log(err));
    },

    createUserInterest = (userInterest, userId) => {
        Axios.post("/api/userInterests/createUserInterest", {
            body: {userInterest, userId}
        })
        .then(res => res.data())
        .catch(err => console.log(err));
    },

    editUserInterests = (newUserInterest, userId) => {
        Axios.patch("/api/userInterests/editUserInterest", {
            body: {newUserInterest, userId}
        })
        .then(res => res.data)
        .catch(err => console.log(err));
    }

}

export default ApiService;
