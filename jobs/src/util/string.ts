export function stripString(regex: RegExp, substitution: string) {
    return (val: string) => {
        return val.replace(regex, substitution);
    };
}
