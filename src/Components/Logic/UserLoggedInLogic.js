import axios from "axios";

export function handleCheckUser(id) {
    if (id > 0) {
        return '/profile'
    } else {
        axios.get('/auth/getsessionuser')
            .then(res => {
                return '/profile'
            })
            .catch(error => {return})
    }
}