function getColumnListById(item) {
  if (item.isDateField)
    return mainSheet
      .getRange(headerRowIndex, columnLetterToIndex(item.colId), currentDataRowCount, 1)
      .getValues()
      .filter((_, i) => i !== 1)
      .map((item, key) => {
        if (key === 0) return item[0];
        else {
          if (item[0]) return new Date(item).toISOString().split("T")[0];
          else return item[0];
        }
      });
  else
    return mainSheet
      .getRange(headerRowIndex, columnLetterToIndex(item.colId), currentDataRowCount, 1)
      .getValues()
      .filter((_, i) => i !== 1);
}
