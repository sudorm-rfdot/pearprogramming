
function loop(row)
{
    let accum = 0;
    let num = 0;
    for(let i = 0; i < row; i++)
    {
        for(let j = 0; j < i; j ++)
        {
            num += 1;
            accum += num;
        }
    }
    return accum
}

const result1 = loop(500);
const result2 = loop(499);
console.log(result1 - result2);