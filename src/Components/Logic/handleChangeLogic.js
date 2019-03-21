export function handleChange(obj, val, name) {
    obj = {...obj, ...{[name]: val}}
    return {...obj}
}