function checkSingleRecord({ apiToken, appId, record, uniqueKey, uniqueVal }) {
  try {
    const singleRecordForCheck = getRecordByField({
      apiToken: apiToken,
      appId: appId,
      uniqueKey: uniqueKey,
      uniqueVal: uniqueVal,
    });

    if (singleRecordForCheck) {
      let originalActionHistory = singleRecordForCheck["アクション履歴"].value;

      if ( originalActionHistory.length !== 0 ) {
        console.log("There are actions after 「資料請求」.");
        record["アクション履歴"] = { value: originalActionHistory };
      } else {
        record["アクション履歴"] = {
          value: [record["アクション履歴"]],
        };
      }

      updateSingleRecord({
        apiToken: apiToken,
        appId: appId,
        recordId: singleRecordForCheck.$id.value,
        record: record,
      });
    } else {
      record["アクション履歴"] = {
        value: [record["アクション履歴"]],
      };
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
