export function handleLoginErrors(email, password) {
    let newArr = []

    if(arguments.length === 0) {
        return ['Invalid password or email']
    }

    if(!email) {
        newArr.push('You must enter an email')
    }

    if(!password) {
        newArr.push('You must enter a password')
    }

    console.log(newArr)
    return newArr
}

export function handleInputColorUpdate(errorsList, emailInput, passwordInput) {
    if(errorsList) {
        errorsList.forEach((error) => {
            if(error.toLowerCase().includes('password') && !passwordInput.current.classList.contains('input-error')) {
                passwordInput.current.classList.add('input-error')
            }
            if(error.toLowerCase().includes('email') && !emailInput.current.classList.contains('input-error')) {
                emailInput.current.classList.add('input-error')
            }
        });
        if (errorsList.length === 0 && passwordInput.current.classList.contains('input-error')) {
            passwordInput.current.classList.remove('input-error')
        }
        if (errorsList.length === 0 && emailInput.current.classList.contains('input-error')) {
            emailInput.current.classList.remove('input-error')
        }
    }
}