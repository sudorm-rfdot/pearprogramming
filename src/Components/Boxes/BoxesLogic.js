export function changeName(obj, val, name) {
    obj = {...obj, ...{[name]: val}}
    return {...obj}
}