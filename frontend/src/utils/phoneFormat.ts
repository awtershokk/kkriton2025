export const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    return phoneNumber;
};

export const formatPhoneNumberOnInput = (phoneNumber: string): string => {
    let cleaned = phoneNumber.replace(/\D/g, '').slice(0, 11);

    if (cleaned.length === 0) {
        return '+7';
    }

    if (cleaned[0] === '8') {
        cleaned = '7' + cleaned.slice(1);
    }
    if (cleaned[0] !== '7') {
        cleaned = '7' + cleaned;
    }

    if (cleaned.length <= 1) {
        return `+${cleaned}`;
    } else if (cleaned.length <= 4) {
        return `+7 (${cleaned.slice(1)}`;
    } else if (cleaned.length <= 7) {
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    } else if (cleaned.length <= 9) {
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    } else {
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    }
};
