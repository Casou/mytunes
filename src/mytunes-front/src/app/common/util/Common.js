export const randomId = (min = 10000, max = 999999999) => {
    return Math.round((Math.random() * (max - min)) + min);
};
