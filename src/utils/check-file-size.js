export const isFileDimensionValid = (file, width, height) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            const { width: imgWidth, height: imgHeight } = this;
            if (imgWidth !== width || imgHeight !== height) {
                resolve({
                    status: 400,
                    message: `Image dimension is too small. Minimum dimension is ${width} x ${height}.`,
                });
            } else {
                resolve({ status: 2000 });
            }
        };
        img.src = URL.createObjectURL(file);
    });
}