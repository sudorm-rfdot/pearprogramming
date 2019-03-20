import { handleRegisterErrors, handleInputColorUpdate } from './RegisterLogic'

describe('Error handling on Login.js', () => {
    test('handleRegisterErrors should be a function', () => {
        expect(typeof handleRegisterErrors).toBe('function')
    })
    test('handleRegisterErrors Should return an array', () => {
        expect(typeof handleRegisterErrors()).toBe(typeof [])
    })
    test('handleRegisterErrors should return an array with errors if empty', () => {
        expect(handleRegisterErrors('', '', '')).toEqual(['You must enter an email', 'You must enter a password', 'Please retype your password'])
    })
})

describe('Color updating input in the login.js on errors', () => {
    test('handleInputColorUpdate should be a function', () => {
        expect(typeof handleInputColorUpdate).toBe('function')
    })
    test('handleLoginErrors should return nothing but update input colors', () => {
        let result = handleInputColorUpdate()
        expect(result).toBe(undefined)
    })
})