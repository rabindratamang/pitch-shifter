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

/**
 * @param {*} amount
 * @returns
 */
function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 0,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
};