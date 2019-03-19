export function handleChange(obj, val, name) {
    if (val && name) {
        obj = {...obj, ...{[name]: val}}
    }
    return {...obj}
}