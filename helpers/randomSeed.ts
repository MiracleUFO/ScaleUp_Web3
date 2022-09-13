export const randomSeed = ():string => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < 4; i++) {
        result += alphabets.charAt(Math.floor(Math.random() * 26))
    }
    return result
}