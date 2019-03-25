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
        default:
            break;
    }

    return newArr
}

export function handleInputColorUpdate(errorsList, obj) {
    const { emailInput, usernameInput, oldPasswordInput, passwordInput, passwordVerInput, deletePasswordInput } = obj

    if (errorsList) {
        let str = errorsList.toString().toLowerCase()

        if (emailInput && emailInput.current) {
            let emailError = str.split(',').filter((element) => {
                return (element.toLowerCase().includes('email') || element.toLowerCase().includes('already'))
            })
            emailError = emailError.toString().toLowerCase()
            if ((emailError.includes('email') || emailError.includes('already')) && !emailInput.current.classList.contains('input-error')) {
                emailInput.current.classList.add('input-error')
            } else if ((!emailError.includes('email') || !emailError.includes('already'))) {
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

        if (passwordInput && passwordInput.current) {
            let passwordError = str.split(',').filter((element) => {
                return (element.toLowerCase().includes('retype') || element.toLowerCase().includes('incorrect')) ? false : element.toLowerCase().includes('password')
            })
            let passwordVerError = str.split(',').filter((element) => {
                return (element.toLowerCase().includes('retype') || element.toLowerCase().includes('match'))
            })


            passwordError = passwordError.toString().toLowerCase()
            if(passwordError.includes('password') && !passwordInput.current.classList.contains('input-error')) {
                passwordInput.current.classList.add('input-error')
            } else if (!passwordError.includes('password')) {
                passwordInput.current.classList.remove('input-error')
            }
    
            passwordVerError = passwordVerError.toString().toLowerCase()
            if((passwordVerError.includes('retype') || passwordVerError.includes('match')) && !passwordVerInput.current.classList.contains('input-error')) {
                passwordVerInput.current.classList.add('input-error')
            } else if (!passwordVerError.includes('retype') || !passwordVerError.includes('retype')){
                passwordVerInput.current.classList.remove('input-error')
            }
        }

        if (oldPasswordInput && oldPasswordInput.current) {
            let oldPasswordError = str.split(',').filter((element) => {
                return element.toLowerCase().includes('incorrect')
            })

            oldPasswordError = oldPasswordError.toString().toLowerCase()
            if(oldPasswordError.includes('incorrect') && !oldPasswordInput.current.classList.contains('input-error')) {
                oldPasswordInput.current.classList.add('input-error')
            } else if (!oldPasswordError.includes('incorrect')){
                oldPasswordInput.current.classList.remove('input-error')
            }
        }

        if (deletePasswordInput && deletePasswordInput.current) {
            let deletePasswordError = str.split(',').filter((element) => {
                return element.toLowerCase().includes('incorrect')
            })

            deletePasswordError = deletePasswordError.toString().toLowerCase()
            if(deletePasswordError.includes('incorrect') && !deletePasswordInput.current.classList.contains('input-error')) {
                deletePasswordInput.current.classList.add('input-error')
            } else if (!deletePasswordError.includes('incorrect')){
                deletePasswordInput.current.classList.remove('input-error')
            }
        }
    }

}