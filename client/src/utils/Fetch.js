const fetchGet = async (url, header) => {
    let response = await fetch(url, {...header});
    const data = await response.json()
    return data
}

const fetchPost = async (url, header, body) => {
    let response = await fetch(url, {...header, ...body});
    const data = await response.json()
    return data
}

export { fetchGet, fetchPost }