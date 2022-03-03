import Axios from '../axios/axios_app';


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

        return resp;
    },

    createUserInterest : async (userInterest, userId) => {

        // try {
        //     let resp = await Axios.post(`/api/userInterests/createUserInterest?userId=${userId}`, {
        //         ...userInterest
        //     })
            
        //     console.log(resp.data)
        //     return resp;
        // } catch(err) {
        //     console.log(err);
        //     return null;
        // }
    },

    editUserInterests : (newUserInterest, userId) => {
        return Axios.patch("/api/userInterests/editUserInterest", {
            ...newUserInterest
        }, {
            params: {       // ! Sig vaka ne se stava param na requestot
                userId
            }
        })
    }

}

export default ApiService;
