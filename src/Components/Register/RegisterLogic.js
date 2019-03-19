import axios from "axios";

export function handleRegisterButton(email, password) {
    axios.post('/auth/register', {email, password})
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(error => {return})
}