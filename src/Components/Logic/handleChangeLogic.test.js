import { handleChange } from './handleChangeLogic'

describe('Handling changing of inputs', () => {
    test('Should have an update function', () => {
        expect(typeof handleChange).toBe('function')
    })
    test('handleChange should return a new object', () => {
        const result = handleChange()
        expect(typeof result).toBe(typeof {})
    })
    test('handleChange should return the new object with old state', () => {
        const result = handleChange({errorsList: [],email: '',password: '',passwordVer: ''})
        expect(result).toEqual({errorsList: [],email: '',password: '',passwordVer: ''})
    })
    test('handleChange should update the name given with new value', () => {
        const result = handleChange({errorsList: [],email: '',password: '',passwordVer: ''}, 'e', 'password')
        expect(result).toEqual({errorsList: [],email: '',password: 'e',passwordVer: ''})
    })
})
