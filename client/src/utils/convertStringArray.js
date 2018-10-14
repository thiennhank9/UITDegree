const convertStringToArray = (string) => {
    if (string === "" || string === " ") {
        return []
    }
    return string.split(";")
}

const convertArrayToString = (array) => {
    return array.join(';')
}

export { convertArrayToString, convertStringToArray }