function updateFieldWhenUpdate(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  // Get the row and column of the edited cell
  const row = range.getRow();
  const column = range.getColumn();
  let header = sheet.getRange(headerRowIndex, column).getValue();
  const columnLetter = String.fromCharCode(64 + column);

  if (!header) {
    console.log("Not header!");
    return;
  }

  header = headerVerification(header);

  const isFieldOfClientManApp = clientManColumns.some(
    (column) => column.colId === columnLetter
  );

  if (!isFieldOfClientManApp) {
    console.log("Not field of client man app!");
    return;
  }

  const uniqueVal = sheet
    .getRange(row, columnLetterToIndex("D"))
    .getValue()
    .replace(/\s+/g, "");

  updateRecordWhenUpdateCell({
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
    uniqueKey: uniqueGKey,
    uniqueVal: uniqueVal,
    record: {
      [header]: {
        value: value,
      },
    },
  });
}

function updateRecordWhenUpdateCell({
  apiToken,
  appId,
  uniqueKey,
  uniqueVal,
  record,
}) {
  const recordByID = getRecordByField({
    apiToken: apiToken,
    appId: appId,
    uniqueKey: uniqueKey,
    uniqueVal: uniqueVal,
  });

  if (!recordByID) {
    return console.error("The record does not exist!");
  }

  updateSingleRecord({
    apiToken: apiToken,
    appId: appId,
    recordId: recordByID.$id.value,
    record: record,
  });
}
