


function swap<T>(arr: T[], a: number, b: number) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
