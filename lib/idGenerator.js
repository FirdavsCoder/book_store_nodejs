const generateId = (data) => {
    let id = 0

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.id > id) {
            id = element.id
        }
    }
    return id+1
}

module.exports = generateId