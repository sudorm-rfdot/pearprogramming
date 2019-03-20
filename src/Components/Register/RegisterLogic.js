function checkEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

export function handleRegisterErrors(email, password, passwordVer) {
    let newArr = []

    if(!email) {
        newArr.push('You must enter an email')
    }

    if(email && !checkEmail(email)) {
        newArr.push('You must enter a valid email')
    }

    if(!password) {
        newArr.push('You must enter a password')
    }

    if(!passwordVer) {
        newArr.push('Please retype your password')
    }

    if(password !== passwordVer) {
        newArr.push('Your passwords do not match')
    }

    return newArr
}

export function handleInputColorUpdate(errorsList, emailInput, passwordInput, passwordVerInput) {
    if(errorsList) {
        let str = errorsList.toString().toLowerCase()
        let strInputOnly = str.split(',').filter((element) => {
            return element.toLowerCase().includes('retype') ? false : element.toLowerCase().includes('password')
        })
        strInputOnly = strInputOnly.toString().toLowerCase()
        if(strInputOnly.includes('password') && !passwordInput.current.classList.contains('input-error')) {
            passwordInput.current.classList.add('input-error')
        } else if (!strInputOnly.includes('password')) {
            passwordInput.current.classList.remove('input-error')
        }

        if(str.includes('retype') && !passwordVerInput.current.classList.contains('input-error')) {
            passwordVerInput.current.classList.add('input-error')
        } else if (!str.includes('retype')) {
            passwordVerInput.current.classList.remove('input-error')
        }

        if(str.includes('email') && !emailInput.current.classList.contains('input-error')) {
            emailInput.current.classList.add('input-error')
        } else if (!str.includes('email')) {
            emailInput.current.classList.remove('input-error')
        }

        if (errorsList.length === 0 && passwordInput.current.classList.contains('input-error')) {
            passwordInput.current.classList.remove('input-error')
        }
        if (errorsList.length === 0 && passwordVerInput.current.classList.contains('input-error')) {
            passwordVerInput.current.classList.remove('input-error')
        }
        if (errorsList.length === 0 && emailInput.current.classList.contains('input-error')) {
            emailInput.current.classList.remove('input-error')
        }
    }
}