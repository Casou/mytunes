export const compareProperty = (a, b, property, order) => {
    if (order === "ASC") {
        if (a[property] < b[property])
            return -1;
        if (a[property] > b[property])
            return 1;
        return 0;
    } else {
        if (a[property] > b[property])
            return -1;
        if (a[property] < b[property])
            return 1;
        return 0;
    }
};