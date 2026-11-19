const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates a single field in the Contact Agent form.
 */
export function validateContactField(field, value) {
  const trimmed = String(value || '').trim();

  switch (field) {
    case 'name': {
      if (!trimmed) return 'Please enter your full name.';
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      return '';
    }
    case 'email': {
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
      return '';
    }
    case 'phone': {
      if (!trimmed) return 'Please enter your phone number.';
      if (!/^[+\d\s\-()]+$/.test(trimmed)) {
        return 'Phone number may only contain digits, +, spaces, and dashes.';
      }
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 10 || digitsOnly.length > 14) {
        return 'Please enter a valid Nigerian phone number (10 to 14 digits).';
      }
      return '';
    }
    case 'message': {
      if (!trimmed) return 'Please include a short message for the agent.';
      if (trimmed.length < 10) return 'Message must be at least 10 characters.';
      return '';
    }
    default:
      return '';
  }
}

/**
 * Validates all fields of the Contact Agent form and returns an errors object.
 */
export function validateContactForm(values) {
  return {
    name: validateContactField('name', values.name),
    email: validateContactField('email', values.email),
    phone: validateContactField('phone', values.phone),
    message: validateContactField('message', values.message),
  };
}
