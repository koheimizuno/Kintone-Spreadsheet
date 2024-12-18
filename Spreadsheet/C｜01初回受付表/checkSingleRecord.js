function checkSingleRecord({ apiToken, appId, record, uniqueKey, uniqueVal }) {
  try {
    const singleRecordForCheck = getRecordByField({
      apiToken: apiToken,
      appId: appId,
      uniqueKey: uniqueKey,
      uniqueVal: uniqueVal,
    });

    if (singleRecordForCheck) {
      updateSingleRecord({
        apiToken: apiToken,
        appId: appId,
        recordId: singleRecordForCheck.$id.value,
        record: record,
      });
    } else {
      addSingleRecord({
        apiToken: apiToken,
        appId: appId,
        record: record,
      });
    }
  } catch (error) {
    console.error(
      `Error checking for existing record or adding row : ${error.message}`
    );
  }
}
