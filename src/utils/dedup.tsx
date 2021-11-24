export function dedup(arr: any) {
  var hashTable: any = {};

  return arr.filter(function (el: any) {
    var key = JSON.stringify(el);
    var match = Boolean(hashTable[key]);

    return match ? false : (hashTable[key] = true);
  });
}
