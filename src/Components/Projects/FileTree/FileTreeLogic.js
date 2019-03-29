export function scrubbedInput(string = '')
{
  const errorArray = [];
    // dont want empty strings
    // dont want strings with spaces in them
  if(!string)
  {
    errorArray.push('Must enter a file name')
  } else if (string.includes(' '))
  {
    errorArray.push('File name cant contain spaces')
  }

  return errorArray;
}
export function correctFileData(data = {})
{
  // is the data an object?
  // is each property the right data type?
  // does the data look like this?
  // {
  //   file_name: 'somestring',
  //   file_link: 'sometext',
  //   project_id: 'somenumber'
  // }
  // returns an Array?
  const errorArray = [];
  if(!(typeof data === 'object' && !Array.isArray(data) && data !== null))
  {
    errorArray.push('expected data to be an object')
  }
  if(!data.file_name)
  {
    errorArray.push('missing the file name on the file object')
  } else if(typeof data.file_name !== 'string')
  {
    errorArray.push('expected file name to be a string')
  }

  if(!data.file_link && data.file_link !== '')
  {
    errorArray.push('missing the file link on the file object')
  } else if(typeof data.file_link !== 'string')
  {
    errorArray.push('expected file link to be a string')
  }

  if(!data.project_id)
  {
    errorArray.push('missing the project ID on the file object')
  } else if(typeof data.project_id !== 'number' && !isNaN(data.project_id))
  {
    errorArray.push('expected project ID to be a number')
  }
  
  
  return errorArray
}