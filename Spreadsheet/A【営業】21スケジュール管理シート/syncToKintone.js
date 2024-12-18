function updateFieldWhenUpdate(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const value = e.value;

  // Get the row and column of the edited cell
  const row = range.getRow();
  const column = range.getColumn();
  const header = sheet.getRange(headerRowIndex, column).getValue();

  if (!header) return;

  // Get the column letter
  const columnLetter = String.fromCharCode(64 + column);

  const isRequiredFieldOfClientManApp = clientManColumns.some(
    (column) => column.colId === columnLetter && column.isRequired === true
  );
  const isRequiredFieldOfBusinessProcessApp = businessProcessColumns.some(
    (column) => column.colId === columnLetter && column.isRequired === true
  );
  const isRequiredFieldOfContactManApp = contactManColumns.some(
    (column) => column.colId === columnLetter && column.isRequired === true
  );

  const clientId = sheet.getRange(row, 1).getValue(); // Assuming column A has record IDs

  if (isRequiredFieldOfClientManApp) {
    updateRecordWhenUpdateCell({
      apiToken: appAccess.clientManApp.apiToken,
      appId: appAccess.clientManApp.appId,
      uniqueKey: "顧客番号",
      uniqueVal: clientId,
      record: {
        [header]: {
          value: value,
        },
      },
    });
  }

  if (isRequiredFieldOfBusinessProcessApp) {
    updateRecordWhenUpdateCell({
      apiToken: appAccess.businessProcessApp.apiToken,
      appId: appAccess.businessProcessApp.appId,
      uniqueKey: "顧客番号",
      uniqueVal: clientId,
      record: {
        [header]: {
          value: value,
        },
      },
    });
  }

  if (isRequiredFieldOfContactManApp) {
    updateRecordWhenUpdateCell({
      apiToken: appAccess.contactManApp.apiToken,
      appId: appAccess.contactManApp.appId,
      uniqueKey: "顧客番号",
      uniqueVal: clientId,
      record: {
        [header]: {
          value: value,
        },
      },
    });
  }
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

function addRecordToBusinessProcessAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate(
    e,
    businessProcessColumns,
    `${appAccess.businessProcessApp.apiToken}, ${appAccess.clientManApp.apiToken}`,
    appAccess.businessProcessApp.appId
  );
}

function addRecordToContactManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate(
    e,
    contactManColumns,
    `${appAccess.contactManApp.apiToken}, ${appAccess.clientManApp.apiToken}`,
    appAccess.contactManApp.appId
  );
}

function addRecordToKintoneAppWhenUpdate(e, columns, apiToken, appId) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const editedRow = range.getRow();
  const editedCol = range.getColumn();

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

  // Check if all required columns are populated
  const isReadyForKintone = columns
    .filter((item) => item.isRequired === true)
    .every(({ colId }) => row[columnLetterToIndex(colId) - 1] !== "");

  if (!isReadyForKintone) {
    console.log("Need to input all required fields!");
    return;
  }

  // Prepare the record to send to Kintone
  const record = {};
  columns.forEach(({ colId, isDateField }) => {
    const value = row[columnLetterToIndex(colId) - 1];
    record[headerRow[columnLetterToIndex(colId) - 1]] = {
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
    uniqueKey: "顧客番号",
    uniqueVal: row[columnLetterToIndex("A") - 1],
  });
}
