function quickSort(arr = [], start = 0, end = arr.length -1) {
  if (start >= end) return;

  let i = start;
  let j = end;
  let standard = arr[start];//将基准数保存
  while(i < j) {
    // 从右边向左边找小于基准数的数
    while (arr[j] >= standard && i < j) {
      j--;
    }
    if (i < j) {
      arr[i] = arr[j];
      i++;
    }
    //从左边向右边找大于基准数的数
    while (arr[i] < standard && i < j) {
      i++;
    }
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  arr[i] = standard;
  quickSort(arr, start, i - 1);
  quickSort(arr, i + 1, end);
  return arr;
}


console.log(quickSort([1,6,8,4,3,7,9,2,5]));