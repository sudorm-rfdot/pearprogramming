import { checkEmail } from './../Logic/checkEmailLogic'

export function handleRegisterErrors(email, password, passwordVer) {
    let newArr = []

    if (!email) {
        newArr.push('You must enter an email')
    }

    if (email && !checkEmail(email)) {
        newArr.push('You must enter a valid email')
    }

    if (!password) {
        newArr.push('You must enter a password')
    }

    if (password.length < 6) {
        newArr.push('Password needs 6 characters')
    }

    if (!passwordVer) {
        newArr.push('Please retype your password')
    }

    if (password !== passwordVer) {
        newArr.push('Your passwords do not match')
    }

    return newArr
}

export function handleInputColorUpdate(errorsList, obj) {
    const { emailInput, passwordInput, passwordVerInput } = obj

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

        if (passwordInput && passwordInput.current) {
            let passwordError = str.split(',').filter((element) => {
                return (element.toLowerCase().includes('retype') || element.toLowerCase().includes('incorrect')) ? false : element.toLowerCase().includes('password')
            })
            let passwordVerError = str.split(',').filter((element) => {
                return (element.toLowerCase().includes('retype') || element.toLowerCase().includes('match'))
            })


            passwordError = passwordError.toString().toLowerCase()
            if (passwordError.includes('password') && !passwordInput.current.classList.contains('input-error')) {
                passwordInput.current.classList.add('input-error')
            } else if (!passwordError.includes('password')) {
                passwordInput.current.classList.remove('input-error')
            }

            passwordVerError = passwordVerError.toString().toLowerCase()
            if ((passwordVerError.includes('retype') || passwordVerError.includes('match')) && !passwordVerInput.current.classList.contains('input-error')) {
                passwordVerInput.current.classList.add('input-error')
            } else if (!passwordVerError.includes('retype') || !passwordVerError.includes('retype')) {
                passwordVerInput.current.classList.remove('input-error')
            }
        }
    }
}