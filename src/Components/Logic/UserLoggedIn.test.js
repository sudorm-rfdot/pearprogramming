import { handleCheckUser } from './UserLoggedInLogic'

describe('Checking if user is logged in', () => {
    test('handleCheckUser function should be a function', () => {
        expect(typeof handleCheckUser).toBe('function')
    })
    test('handleCheckUser should return nothing if id exists', () => {
        expect(typeof handleCheckUser(0)).toBe('undefined')
    })
    test('handleCheckUser should return a string if id exists', () => {
        expect(typeof handleCheckUser(1)).toBe('string')
    })
})