function addRecordToClientManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}

function deleteRecordToClientManAppWhenDeleteRow(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const editedRow = range.getRow();
  const lastRow = sheet.getLastRow();

  if (editedRow < lastRow) {
    console.log("Not need to add record!");
    return;
  }
  const isReadyForKintone = clientManColumns
    .filter((item) => item.isRequired === true)
    .every(({ colId }) => row[columnLetterToIndex(colId) - 1] !== "");
}

function updateFieldToClientManAppWhenUpdate(e) {
  updateRecordWhenUpdateCell({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}
