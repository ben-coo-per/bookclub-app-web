export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelCaseToCapitalizedWords(text: string) {
  var words = text.match(/[A-Za-z][a-z]*/g) || [];

  return words.map(capitalizeFirstLetter).join(" ");
}
