import { handleProfileErrors, handleInputColorUpdate } from './ProfileLogic'

describe('Error handling on Profile.js', () => {
    // Spencer
    test('handleProfileErrors should be a function', () => {
        expect(typeof handleProfileErrors).toBe('function')
    })
    // Spencer
    test('handleProfileErrors Should return an array', () => {
        expect(typeof handleProfileErrors()).toBe(typeof [])
    })
    // Spencer
    test('handleProfileErrors should return an array with errors if empty', () => {
        expect(handleProfileErrors('email', {})).toEqual(['You must enter an email'])
    })
    test('handleProfileErrors should return an array with errors in password', () => {
        expect(handleProfileErrors('username', {})).toEqual(['You must enter a username'])
    })
})

describe('Color updating input in the Profile.js with errors', () => {
    test('handleInputColorUpdate should be a function', () => {
        expect(typeof handleInputColorUpdate).toBe('function')
    })
})

