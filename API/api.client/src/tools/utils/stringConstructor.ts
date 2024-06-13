export { };

declare global {
    interface StringConstructor {
        isNullOrEmpty(str: string | null | undefined): str is null | undefined;
        isNullOrWhitespace(str: string | null | undefined): str is null | undefined;

        isNotNullOrEmpty(str: string | null | undefined): str is string;
        isNotNullOrWhitespace(str: string | null | undefined): str is string;

        formatHashtagString(str: string | null | undefined): string;
        substringBetween(string: string, firstChar: string, endChar: string): string;
    }
}

String.isNullOrEmpty = function (str: string | null | undefined): str is null | undefined {
    return !str;
}

String.isNullOrWhitespace = function (str: string | null | undefined): str is null | undefined {
    return !str || str.trim().length == 0;
}

String.isNotNullOrEmpty = function (str: string | null | undefined): str is string {
    return !String.isNullOrEmpty(str);
}

String.isNotNullOrWhitespace = function (str: string | null | undefined): str is string {
    return !String.isNullOrWhitespace(str);
}

String.formatHashtagString = function (str: string | null | undefined): string {
    if (str && str.length > 0) {
        let parts: string[] = str.split(',');

        for (let i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i][0] !== '#')
                parts[i] = '#' + parts[i];
        }

        str = parts.join(',');
    }

    return str ?? '';
}
