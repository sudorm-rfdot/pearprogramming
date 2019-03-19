import { handleRegisterButton } from './RegisterLogic'

describe('Register Component - Register Button', () => {
    test('handleRegisterButton function should be a function', () => {
        expect(typeof handleRegisterButton).toBe('function')
    })
    test('handleRegisterButton function should return an object given two correct parameters', () => {
        expect(typeof handleRegisterButton('fake@fake.fake', 'fake')).toBe('object')
    })
})