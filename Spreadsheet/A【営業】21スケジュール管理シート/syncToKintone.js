function updateFieldWhenUpdate(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  // Get the row and column of the edited cell
  const row = range.getRow();
  const column = range.getColumn();
  const header = sheet.getRange(headerRowIndex, column).getValue();
  const columnLetter = String.fromCharCode(64 + column);

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

function addRecordToClientManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate(
    e,
    clientManColumns,
    appAccess.clientManApp.apiToken,
    appAccess.clientManApp.appId
  );
}

function addRecordToKintoneAppWhenUpdate(e, columns, apiToken, appId) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const editedRow = range.getRow();
  const editedCol = range.getColumn();
  const lastRow = sheet.getLastRow();

  if (editedRow < lastRow) {
    console.log("Not need to add record!");
    return;
  }

  // Check if the edited column is part of the mapped columns
  const editedColumnMapping = columns.find(
    ({ colId }) => columnLetterToIndex(colId) === editedCol
  );

  if (!editedColumnMapping) {
    console.log("Edited column is not relevant to the kintone app");
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
  const record = {};
  const uniqueVal = row[columnLetterToIndex(uniqueGColumnLetter) - 1];
  columns.forEach(({ colId, isDateField }) => {
    const header = headerVerification(
      headerRow[columnLetterToIndex(colId) - 1]
    );
    const value = row[columnLetterToIndex(colId) - 1];
    record[header] = {
      value: value
        ? isDateField
          ? new Date(value).toISOString().split("T")[0]
          : value
        : "",
    };
  });

  checkSingleRecord({
    apiToken: apiToken,
    appId: appId,
    record: record,
    uniqueKey: uniqueGFieldKey,
    uniqueVal: uniqueVal,
  });
}
