export const getImageTypeFromBase64 = (base64) => {
    const match = base64.match(/^data:image\/([a-z]+);base64,/i);
    if (match) {
        return match[1];
    }
    return null;
}

export const getExtFromURL = (url) => {
    const ext = url.substring(url.lastIndexOf('.') + 1);
    return ext.toLowerCase();
}
