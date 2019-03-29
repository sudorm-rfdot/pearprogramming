import {scrubbedInput, correctFileData} from './FileTreeLogic';

describe('Does the filename input match the right format', () =>
{
  test('does it return an error array', () =>
  {
    const result = scrubbedInput('newFile')
    expect(Array.isArray(result)).toEqual(true)
  })
  test('is the array empty with correct input', () =>
  {
    const result = scrubbedInput('newFile');
    expect(result.length).toEqual(0);
  })

  test('is the array not empty when string is empty', () =>
  {
    const result = scrubbedInput('');
    expect(result.length).toEqual(1);
  })

  test('is the array not empty when string has spaces', () =>
  {
    const result = scrubbedInput('my cool file');
    expect(result.length).toEqual(1)
  })
})

describe('Does the file match the right format', () =>
{
  test('does it return an error array', () =>
  {
    const result = correctFileData()
    expect(Array.isArray(result)).toEqual(true)
  })
  test('is the array empty with correct input', () =>
  {
    const obj = {
      file_name: 'somestring',
      file_link: 'sometext',
      project_id: 123
    }
    const result = correctFileData(obj);
    expect(result.length).toEqual(0);
  })

  test('is the array not empty when object is missing properties', () =>
  {
    const obj1 = {
      file_name: 'somestring',
      file_link: 'sometext',
    }
    const obj2 = {
      file_name: 'somestring',
      project_id: 123
    }
    const obj3 = {
      file_link: 'sometext',
      project_id: 123
    }
    const result1 = correctFileData(obj1);
    const result2 = correctFileData(obj2);
    const result3 = correctFileData(obj3);
    expect(result1.length).toEqual(1);
    expect(result2.length).toEqual(1);
    expect(result3.length).toEqual(1);
  })

  test('is the array not empty when object properties have wrong data types', () =>
  {
    const obj1 = {
      file_name: 'somestring',
      file_link: 'sometext',
      project_id: '123'
    }
    const obj2 = {
      file_name: 'somestring',
      file_link:  123,
      project_id: 123
    }
    const obj3 = {
      file_name: 123,
      file_link: 'sometext',
      project_id: 123
    }
    const result1 = correctFileData(obj1);
    const result2 = correctFileData(obj2);
    const result3 = correctFileData(obj3);
    expect(result1.length).toEqual(1);
    expect(result2.length).toEqual(1);
    expect(result3.length).toEqual(1);
  })
})
