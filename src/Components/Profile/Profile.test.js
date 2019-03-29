import { handleProfileErrors, handleInputColorUpdate } from './ProfileLogic'

describe('Error handling on Profile.js', () => {
    test('handleProfileErrors should be a function', () => {
        expect(typeof handleProfileErrors).toBe('function')
    })
    test('handleProfileErrors Should return an array', () => {
        expect(typeof handleProfileErrors()).toBe(typeof [])
    })
    test('handleProfileErrors should return an array with errors if empty', () => {
        expect(handleProfileErrors('email', {})).toEqual(['You must enter an email'])
    })

})

