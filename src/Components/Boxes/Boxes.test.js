import {changeName} from './BoxesLogic';

describe('Handling changing of project name', () => {
    test('Should have an update function', () => {
        expect(typeof changeName).toBe('function')
    })
    test('changeName should return a new object', () => {
        const result = changeName()
        expect(typeof result).toBe(typeof {})
    })
    test('changeName should return the new object with old state', () => {
        const result = changeName({projectName: '', projectId: ''})
        expect(result).toEqual({projectName: '', projectId: ''})
    })
    test('changeName should update the name given with new value', () => {
        const result = changeName({projectName: '', projectId: ''}, 'e', 'projectName')
        expect(result).toEqual({projectName: 'e', projectId: ''})
    })
})