function checkSingleRecord({ apiToken, appId, record, uniqueKey, uniqueVal }) {
  try {
    const singleRecordForCheck = getRecordByField({
      apiToken: apiToken,
      appId: appId,
      uniqueKey: uniqueKey,
      uniqueVal: uniqueVal,
    });

    if (singleRecordForCheck) {
      if (record[limitedUserFieldKey].value.trim() === "希望する") {
        if (!singleRecordForCheck[currentStatusFieldKey].value) {
          record[currentStatusFieldKey] = { value: "限定会員" };
        }
      }
      updateSingleRecord({
        apiToken: apiToken,
        appId: appId,
        recordId: singleRecordForCheck.$id.value,
        record: record,
      });
    } else {
      if (record[limitedUserFieldKey].value.trim() === "希望する") {
        record[currentStatusFieldKey] = { value: "限定会員" };
      }
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
