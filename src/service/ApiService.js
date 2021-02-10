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
        // .then(res => res.data())
        // .catch(err => console.log(err));
    },

    createUserInterest : (userInterest, userId) => {
        Axios.post("/api/userInterests/createUserInterest", {
            body: {userInterest, userId}
        })
        .then(res => res.data())
        .catch(err => console.log(err));
    },

    editUserInterests : (newUserInterest, userId) => {
        Axios.patch("/api/userInterests/editUserInterest", {
            body: {newUserInterest, userId}
        })
        .then(res => res.data)
        .catch(err => console.log(err));
    }

}

export default ApiService;
