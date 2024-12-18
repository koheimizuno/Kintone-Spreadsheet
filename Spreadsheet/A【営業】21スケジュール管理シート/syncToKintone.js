function addRecordToClientManAppWhenUpdate(e) {
  addRecordToKintoneAppWhenUpdate(
    e,
    clientManColumns,
    appAccess.clientManApp.apiToken,
    appAccess.clientManApp.appId
  );
}

function updateFieldWhenUpdate(e) {
  updateRecordWhenUpdateCell({
    e: e,
    columns: clientManColumns,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
  });
}
