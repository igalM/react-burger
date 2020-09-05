export const updateObject = (oldState, updatedProperties) => ({
    ...oldState,
    ...updatedProperties
});

export const checkValidity = (rules, value) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        isValid = regex.test(value) && isValid;
    }

    return isValid;
}

