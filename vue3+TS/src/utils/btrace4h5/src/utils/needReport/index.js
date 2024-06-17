export const needReport = (sampling = 10) => {
    // sampling: 0 - 1
    sampling = Number(sampling) / 100;
    // console.log("sampling", sampling);
    return Math.random() <= sampling;
};
