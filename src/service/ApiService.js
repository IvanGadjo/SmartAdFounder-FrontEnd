import Axios from '../axios/axios_app';
// import Axios from 'axios';

const ApiService = {

    // unused
     getUserInterests : (userId) => {
        return Axios.get(`/api/userInterests/all/byUser/${userId}`)
    },

    createUser : (user) => {
        return Axios.post("/api/users/createUser", {
            id: user.id,
            userEmail: user.email
        })
    },

    createUserInterest : (userInterest, userId) => {
        return Axios.post("/api/userInterests/createUserInterest", {
            ...userInterest
        }, {
            params: {
                userId
            }
        })
    },

    editUserInterests : (newUserInterest, userId) => {
        return Axios.patch("/api/userInterests/editUserInterest", {
            ...newUserInterest
        }, {
            params: {
                userId
            }
        })
    }

}

export default ApiService;
