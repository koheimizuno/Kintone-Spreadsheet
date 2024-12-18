function addRecordToClientManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate(
    e,
    clientManColumns,
    appAccess.clientManApp.apiToken,
    appAccess.clientManApp.appId
  );
}

function updateFieldWhenUpdate(e) {
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

  const isFieldOfClientManApp = clientManColumns.some(
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

  updateRecordWhenUpdateCell({
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
    uniqueKey: uniqueGFieldKey,
    uniqueVal: uniqueVal,
    record: {
      [header]: {
        value: value,
      },
    },
  });
}
