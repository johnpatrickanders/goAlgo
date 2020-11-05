import framerize from './util';

export default function selectionSort(array) {
  const animations = [];
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    const animation = {};
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      animation.comparison = [i, smallestIdx];
      if (array[i] < array[smallestIdx]) {
        smallestIdx = i;
        console.log(smallestIdx)
      }
    }
    animation.swap = [startIdx, smallestIdx];
    const tempSmallVal = array[smallestIdx];
    array[smallestIdx] = array[startIdx];
    array[startIdx] = tempSmallVal;
    startIdx += 1;
  }
  return framerize(array);
};
