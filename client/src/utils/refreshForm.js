export function refreshFormSubmit(changeObject, object) {
    return {
        ...changeObject, 
        ...object,
    }
}