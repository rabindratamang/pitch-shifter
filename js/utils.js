/**
 * @param {*} min
 * @param {*} max
 * @param {*} value
 * @returns
 */
function normalize(x,y,min,max,value){
    let normalizedValue = (value-min)/(max-min);
    normalizedValue = (normalizedValue * (y-x)) + x;
    return normalizedValue;
}