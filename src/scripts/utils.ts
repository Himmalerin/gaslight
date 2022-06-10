export const truncateString: Function = (string: string, maxLength: number | null): string => {
    const DEFAULT_MAX_MESSAGE_LENGTH = 100;
    const MAX_MESSAGE_LENGTH = maxLength || DEFAULT_MAX_MESSAGE_LENGTH;

    if (string.length > MAX_MESSAGE_LENGTH) {
        return string.substring(0, MAX_MESSAGE_LENGTH - 1) + "…";
    } else {
        return string;
    }
};