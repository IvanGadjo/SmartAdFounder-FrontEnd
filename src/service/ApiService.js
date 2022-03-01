import Axios from '../axios/axios_app';
// import Axios from 'axios';

const ApiService = {

    // unused
     getUserInterests : (userId) => {
        return Axios.get(`/api/userInterests/all/byUser/${userId}`)
    },

    createUser : (user) => {
        let resp = Axios.post("/api/users/createUser", {
            id: user.id,
            userEmail: user.email
        });

        // console.log(resp);
        return resp;
    },

    createUserInterest : async (userInterest, userId) => {

        try {
            let resp = await Axios.post(`/api/userInterests/createUserInterest?userId=${userId}`, {
                ...userInterest
            })
            
            console.log(resp.data)
            return resp;
        } catch(err) {
            console.log(err);
            return null;
        }
        
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
