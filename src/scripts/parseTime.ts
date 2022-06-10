import {TimesUnits, TimesInMilliseconds} from "../typings/enums";

export const parseTime: Function = (lengthOfTime: number, unitOfTime: string): Date | boolean => {
    if (unitOfTime.startsWith(TimesUnits.Year)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Year;

        return new Date(Date.now() + additionalTime);
    } else if (unitOfTime.startsWith(TimesUnits.Month)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Month;

        return new Date(Date.now() + additionalTime);
    } else if (unitOfTime.startsWith(TimesUnits.Week)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Week;

        return new Date(Date.now() + additionalTime);
    } else if (unitOfTime.startsWith(TimesUnits.Day)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Day;

        return new Date(Date.now() + additionalTime);
    } else if (unitOfTime.startsWith(TimesUnits.Hour)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Hour;

        return new Date(Date.now() + additionalTime);
    } else if (unitOfTime.startsWith(TimesUnits.Minute)) {
        const additionalTime: number = lengthOfTime * TimesInMilliseconds.Minute;

        return new Date(Date.now() + additionalTime);
    } else {
        return false;
    }
};
