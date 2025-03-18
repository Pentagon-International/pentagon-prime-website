
export const validation = (values, fields, setErrors) => {
    let newErrors = {};
    let hasErrors = false;

    fields.forEach((field) => {
        if (field.required && !values[field.name]) {
            newErrors[field.name] = `${field.label} is required`;
            hasErrors = true;
        } else if (Array.isArray(values[field.name])) {
            if (values[field.name].length === 0) {
                newErrors[field.name] = `${field.label} is required`;
                hasErrors = true;
            }
        } else if (field.validate) {
            const error = validateInput(values[field.name], field.validate);
            if (error) {
                newErrors[field.name] = error;
                hasErrors = true;
            }
        }
    });

    setErrors(newErrors);
    return hasErrors

}

export const validateInput = (value, validationType) => {
    if (!value) return null; // No validation if the field is empty
    switch (validationType) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
        case 'number':
            return /^\d+$/.test(value) ? null : 'Only numbers are allowed';
        case 'phone':
            return /^\d{10}$/.test(value) ? null : 'Enter a valid 10-digit phone number';  // only type number validation is pending
        case 'text':
            return /^[a-zA-Z\s]+$/.test(value) ? null : 'Only text is allowed';
        case 'alphanumeric':
            return /^[a-zA-Z0-9 ]+$/.test(value) ? null : 'Only Alphanumeric is allowed';
        case 'tag-email':
            if (!Array.isArray(value)) return "Invalid input format";
            const invalidEmails = value.filter(email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
            return invalidEmails.length === 0 ? null : `Invalid email(s): ${invalidEmails.join(", ")}`;
        case "url":
            return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/.test(value)
                ? null
                : "Invalid URL format. Example: example.com or https://example.com";
        default:
            return null; // No validation
    }
};