function addRecordToKintoneAppWhenUpdate({ e, columns, apiToken, appId }) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const editedRow = range.getRow();
  const editedCol = range.getColumn();
  const lastRow = sheet.getLastRow();

  if (editedRow < lastRow) {
    console.log("Not need to add record!");
    return;
  }

  if (editedCol !== columnLetterToIndex(uniqueGColumnLetter)) {
    console.log("Not edited unique field column!");
    return;
  }

  // Fetch the row data
  const headerRow = sheet
    .getRange(headerRowIndex, 1, 1, sheet.getLastColumn())
    .getValues()[0];

  const row = sheet
    .getRange(editedRow, 1, 1, sheet.getLastColumn())
    .getValues()[0];

  const isReadyForKintone =
    row[columnLetterToIndex(uniqueGColumnLetter) - 1] !== "";

  if (!isReadyForKintone) {
    console.log("Need to input unique key field!");
    return;
  }

  // Prepare the record to send to Kintone
  let record = {};
  const uniqueVal = row[columnLetterToIndex(uniqueGColumnLetter) - 1];

  columns.forEach(({ colId }) => {
    const header = headerVerification(
      headerRow[columnLetterToIndex(colId) - 1]
    );

    const value = row[columnLetterToIndex(colId) - 1];

    record = recordVerification(record, header, value);
  });

  checkSingleRecord({
    apiToken: apiToken,
    appId: appId,
    record: record,
    uniqueKey: uniqueGFieldKey,
    uniqueVal: uniqueVal,
  });
}
