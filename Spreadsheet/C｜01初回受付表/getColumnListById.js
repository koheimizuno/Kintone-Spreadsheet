function getColumnListById(item) {
  return mainSheet
    .getRange(
      headerRowIndex,
      columnLetterToIndex(item.colId),
      currentDataRowCount,
      1
    )
    .getValues()
    .map((item, key) => {
      if (key === 0) return item[0];
      else {
        if (item[0] instanceof Date) {
          return Utilities.formatDate(
            item[0],
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
          );
        } else return item[0];
      }
    });
}
