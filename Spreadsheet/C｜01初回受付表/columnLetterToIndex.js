function columnLetterToIndex(letter) {
  let columnIndex = 0;
  let length = letter.length;
  for (let i = 0; i < length; i++) {
    columnIndex *= 26; // Multiply the index value by 26 for each new letter
    columnIndex += letter.charCodeAt(i) - "A".charCodeAt(0) + 1; // Calculate the difference and add
  }
  return columnIndex;
}
