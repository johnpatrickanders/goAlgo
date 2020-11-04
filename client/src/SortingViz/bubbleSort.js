

function bubbleSort(array) {
  // Write your code here.
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        const first = array[i];
        const second = array[i + 1];
        array[i] = second;
        array[i + 1] = first;
        swapped = true;
      }
    }
  }
  return array
}
