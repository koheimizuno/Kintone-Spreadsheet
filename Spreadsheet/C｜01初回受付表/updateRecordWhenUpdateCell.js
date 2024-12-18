function updateRecordWhenUpdateCell({ e, columns, apiToken, appId }) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  // Get the row and column of the edited cell
  const row = range.getRow();
  const column = range.getColumn();
  const columnLetter = String.fromCharCode(64 + column);
  let header = sheet.getRange(headerRowIndex, column).getValue();

  if (!header) {
    console.log("Not header!");
    return;
  }

  const isFieldOfClientManApp = columns.some(
    (column) => column.colId === columnLetter
  );

  if (!isFieldOfClientManApp) {
    console.log("Not field of client man app!");
    return;
  }

  header = headerVerification(header);
  const uniqueVal = sheet
    .getRange(row, columnLetterToIndex(uniqueGColumnLetter))
    .getValue()
    .replace(/\s+/g, "");

  const recordByID = getRecordByField({
    apiToken: apiToken,
    appId: appId,
    uniqueKey: uniqueGFieldKey,
    uniqueVal: uniqueVal,
  });

  if (!recordByID) {
    return console.error("The record does not exist!");
  }

  const record = {
    [header]: {
      value: value,
    },
  };

  updateSingleRecord({
    apiToken: apiToken,
    appId: appId,
    recordId: recordByID.$id.value,
    record: record,
  });
}
