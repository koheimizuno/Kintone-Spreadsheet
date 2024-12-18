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
