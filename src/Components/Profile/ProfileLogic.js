import { checkEmail } from './../Logic/checkEmailLogic'

export function handleProfileErrors(name, obj) {
    let newArr = []

    switch (name) {
        case (name === 'email'):
            if (!obj['email']) {
                newArr.push('You must enter an email')
            }

            if (obj['email'] && !checkEmail(obj['email'])) {
                newArr.push('You must enter a valid email')
            }

            break;
        case (name === 'password'):
            if (!obj['password']) {
                newArr.push('You must enter a password')
            }
        
            if (obj['password'].length < 6) {
                newArr.push('Password needs 6 characters')
            }
        
            if (!obj['passwordVer']) {
                newArr.push('Please retype your password')
            }
        
            if (obj['password'] !== obj['passwordVer']) {
                newArr.push('Your passwords do not match')
            }

            break;
        case (name === 'username'):
        case (name === 'delete'):
        default:
            break;
    }

    return newArr
}

export function handleInputColorUpdate(errorsList) {
    if(errorsList) {
        
    }
}