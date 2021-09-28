export function colorToRgba(color, fallback = null) {
    if (!color) {
        return fallback;
    }

    return `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`;
}