function addRecordToClientManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}

function updateFieldToClientManAppWhenUpdate(e) {
  updateRecordWhenUpdateCell({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}

function deleteRecordToClientManAppWhenDeleteRow(e) {
  deleteRecordToKintoneAppWhenUpdate({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}
