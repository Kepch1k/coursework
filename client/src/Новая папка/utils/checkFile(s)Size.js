export default (files, maxSize) => {
    let size = 0;
    for (let key in files) {
        if (files.hasOwnProperty(key)) {
            size += files[key]["size"];
        }
    }
    if ((size) > maxSize * 1048576) {
        return `The current files size is more than ${maxSize}mb, please use smaller files.`;
    } else {
        return null;
    }

};