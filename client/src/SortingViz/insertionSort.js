import framerize from './util';

export default function insertionSort(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    const animation = {}
    animation.comparison = [j, j - 1]
    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      animation.swap = [i, j - 1];
      j -= 1;
    }
    if (!animation.swap) {
      animation.swap = [0, 0]
    }
    animations.push(animation);
  }
  return framerize(animations);
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j]
  array[j] = temp
}
