const formate10 = number => {
    return number >= 10 ? number : "0" + number;
};

export const formateDuree = duree => {
    const sec_num = parseInt(duree, 10);
    const hours = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return ((hours > 0) ? formate10(hours) + ":" : "")
        + formate10(minutes) + ":"
        + formate10(seconds);
};