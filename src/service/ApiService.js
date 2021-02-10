import Axios from '../axios/axios_app';
// import Axios from 'axios';

const ApiService = {

     getUserInterests : (userId) => {
        Axios.get(`/api/userInterests/all/byUser/${userId}`)
        .then(res => res.data())
        .catch(err => console.log(err));
    },

    createUser : (user) => {
        console.log()
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
