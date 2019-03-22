import { handleLoginErrors, handleInputColorUpdate } from './LoginLogic'

describe('Error handling on Login.js', () => {
    test('handleLoginErrors should be a function', () => {
        expect(typeof handleLoginErrors).toBe('function')
    })
    test('handleLoginErrors Should return an array', () => {
        expect(typeof handleLoginErrors()).toBe(typeof [])
    })
    test('handleLoginErrors should return an array with errors if empty', () => {
        expect(handleLoginErrors('', '')).toEqual(['You must enter an email', 'You must enter a password'])
    })
    test('handleLoginErrors should return a specific array if no arguments passed in', () => {
        expect(handleLoginErrors()).toEqual(['Invalid password or email'])
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