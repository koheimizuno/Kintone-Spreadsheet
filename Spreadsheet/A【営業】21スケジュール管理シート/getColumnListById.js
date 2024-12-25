function getColumnListById(item) {
  return mainSheet
    .getRange(
      headerRowIndex,
      columnLetterToIndex(item.colId),
      currentDataRowCount,
      1
    )
    .getValues()
    .filter((_, i) => i !== 1)
    .map((item, key) => {
      if (key === 0) return item[0];
      else {
        if (item[0] instanceof Date) {
          let formattedDate = Utilities.formatDate(
            item[0],
            "Asia/Tokyo",
            "yyyy-MM-dd'T'HH:mm:ss"
          );
          return `${formattedDate}+09:00`;
        } else return item[0];
      }
    });
}
