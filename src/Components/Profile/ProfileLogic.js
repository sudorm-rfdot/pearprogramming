import { checkEmail } from './../Logic/checkEmailLogic'

export function handleProfileErrors(name, obj) {
    let newArr = []

    switch (name) {
        case ('email'):
            if (!obj['email']) {
                newArr.push('You must enter an email')
            }

            if (obj['email'] && !checkEmail(obj['email'])) {
                newArr.push('You must enter a valid email')
            }

            break;
        case ('password'):
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
        case ('username'):
            if (!obj['username']) {
                newArr.push('You must enter a username')
            }

            break;
        case (name === 'delete'):
        default:
            break;
    }

    return newArr
}

export function handleInputColorUpdate(errorsList, obj) {
    const { emailInput, usernameInput } = obj

    if (errorsList) {
        let str = errorsList.toString().toLowerCase()

        if (emailInput && emailInput.current) {
            if ((str.includes('email') || str.includes('already')) && !emailInput.current.classList.contains('input-error')) {
                emailInput.current.classList.add('input-error')
            } else if ((!str.includes('email') || !str.includes('already'))) {
                emailInput.current.classList.remove('input-error')
            }

            if (errorsList.length === 0 && emailInput.current.classList.contains('input-error')) {
                emailInput.current.classList.remove('input-error')
            }
        }

        if (usernameInput && usernameInput.current) {
            if (str.includes('username') && !usernameInput.current.classList.contains('input-error')) {
                usernameInput.current.classList.add('input-error')
            } else if (!str.includes('username')) {
                usernameInput.current.classList.remove('input-error')
            }

            if (errorsList.length === 0 && usernameInput.current.classList.contains('input-error')) {
                usernameInput.current.classList.remove('input-error')
            }
        }
    }

}