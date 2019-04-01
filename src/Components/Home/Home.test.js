import {toggleBool} from './HomeLogic';

describe('ensures createproject toggles state on Home.js', () => {
  // Soencer
  test('is this a function?', () => { 
    expect(typeof toggleBool).toBe('function')
  })
  // Spencer
  test('lit', () => {
    let result = toggleBool()
    expect(typeof result).toBe('boolean')
  })
})