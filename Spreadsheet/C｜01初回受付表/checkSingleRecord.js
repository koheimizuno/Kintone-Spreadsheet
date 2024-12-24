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

      let originalActionHistory = singleRecordForCheck["アクション履歴"].value;
      let toModifyActionHistory = record["アクション履歴"];

      if (
        originalActionHistory[originalActionHistory.length - 1].value[
          "営業履歴"
        ].value === "資料請求"
      ) {
        originalActionHistory.push(toModifyActionHistory);
        record["アクション履歴"] = { value: originalActionHistory };
      } else {
        record["アクション履歴"] = { value: originalActionHistory };
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
