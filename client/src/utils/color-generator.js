//рассчитать цвет в диапазоне для элемента массива

function calculatePoint(i, intervalSize, colorRangeInfo) {
  let { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return (useEndAsStart
    ? (colorEnd - (i * intervalSize))
    : (colorStart + (i * intervalSize)));
}

//
function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  let { colorStart, colorEnd } = colorRangeInfo;
  let colorRange = colorEnd - colorStart;
  let intervalSize = colorRange / dataLength;
  let colorPoint;
  let colorArray = [];
  for (let i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }
  return colorArray;
}

export { interpolateColors };