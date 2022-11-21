type HEX = `#${string}`;

export function stringToColor(str: string): HEX | string {
    let hash = 0;
    let color = "#";

    str = String(str);

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;

        color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
}