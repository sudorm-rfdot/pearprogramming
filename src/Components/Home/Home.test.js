import {toggleBool} from './HomeLogic';

describe('ensures createproject toggles state on Home.js', () => {
  test('is this a function?', () => {
    expect(typeof toggleBool).toBe('function')
  })
  test('lit', () => {
    let result = toggleBool()
    expect(typeof result).toBe('boolean')
  })
})