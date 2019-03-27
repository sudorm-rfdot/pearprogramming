const dummy = [
  {
    "Unit": "G417-4",
    "Building": "A",
    "Apt": 417,
    "Room": "B",
    "Bed": 4,
    "Bed Type": "3x3 Shared Regular",
    "Gender": "Female",
    "": "3x3 Shared Regular Female",
    "Resident Name": "Name 1",
    "Contract Rent": 335,
    "Lease Start": "8/16/2018",
    "Lease End": "7/25/2019",
    "Age": 19,
    "Notes": ""
  },
  {
    "Unit": "G323-4",
    "Building": "G",
    "Apt": 323,
    "Room": "D",
    "Bed": 4,
    "Bed Type": "4x2 Private Regular",
    "Gender": "Male",
    "": "4x2 Private Regular Male",
    "Resident Name": "Name 2",
    "Contract Rent": 465,
    "Lease Start": "8/16/2018",
    "Lease End": "7/25/2019",
    "Age": 18,
    "Notes": ""
  },
  {
    "Unit": "G404-3",
    "Building": "G",
    "Apt": 405,
    "Room": "B",
    "Bed": 3,
    "Bed Type": "3x3 Shared Regular",
    "Gender": "Female",
    "": "3x3 Shared Regular Female",
    "Resident Name": "Name 3",
    "Contract Rent": 585,
    "Lease Start": "8/16/2018",
    "Lease End": "7/25/2019",
    "Age": 19,
    "Notes": ""
  },
  {
    "Unit": "G404-4",
    "Building": "G",
    "Apt": 404,
    "Room": "B",
    "Bed": 4,
    "Bed Type": "3x3 Shared Regular",
    "Gender": "Female",
    "": "3x3 Shared Regular Female",
    "Resident Name": "Name 4",
    "Contract Rent": 0,
    "Lease Start": "8/16/2018",
    "Lease End": "7/25/2019",
    "Age": 19,
    "Notes": ""
  },
]
let property = {};
dummy.forEach((curVal) =>
{
  if(!property[curVal.Building])
  {
    // const accu = {};
    property[curVal.Building] = {
      bldg: curVal.Building,
      [Math.trunc(curVal.Apt / 100)]: {
        floor: Math.trunc(curVal.Apt / 100),
        [curVal.Apt]: {
          unit: curVal.Apt,
          [curVal.Unit]: {
            renter: curVal["Resident Name"],
            gender: curVal.Gender
          }
        }
      }
    }
  }
  else
  {
    const floor = property[curVal.Building][Math.trunc(curVal.Apt / 100)]
    // console.log(Math.trunc(curVal.Apt / 100).toString())
    // console.log(floor);
    if(!floor)
    {
      property[curVal.Building][Math.trunc(curVal.Apt / 100)] = {
        floor: Math.trunc(curVal.Apt / 100),
        [curVal.Apt]: {
          unit: curVal.Apt,
          [curVal.Unit]: {
            renter: curVal["Resident Name"],
            gender: curVal.Gender
          }
        }
      }
    }
    else
    {
      const unit = property[curVal.Building][Math.trunc(curVal.Apt / 100)][curVal.Apt]
      if(!unit)
      {
        property[curVal.Building][Math.trunc(curVal.Apt / 100)][curVal.Apt] = {
          unit: curVal.Apt,
          [curVal.Unit]: {
            renter: curVal["Resident Name"],
            gender: curVal.Gender
          }
        }
      }
      else
      {
        // const {resident} = property[curVal.Building][Math.trunc(curVal.Apt / 100)][curVal.Apt][curVal.Unit];
        // if(!unit)
        // {
          property[curVal.Building][Math.trunc(curVal.Apt / 100)][curVal.Apt][curVal.Unit] = {
            renter: curVal["Resident Name"],
            gender: curVal.Gender
          }
        // }
      }// room if
    } // unit if
  } // floor if
}); // foreach
console.log(property);