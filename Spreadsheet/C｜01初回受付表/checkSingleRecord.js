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
        originalActionHistory[originalActionHistory.length - 1]?.value[
          "営業履歴"
        ].value === "資料請求"
      ) {
        originalActionHistory.push(toModifyActionHistory);
        record["アクション履歴"] = { value: originalActionHistory };
      } else {
        console.log("The current action is not 「資料請求」.");
        originalActionHistory = originalActionHistory.map((item) => {
          if (item.value.営業履歴.value === "限定会員") {
            if (toModifyActionHistory.value?.日付) {
              item.value.日付.value = toModifyActionHistory.value?.日付.value;
            }
            if (toModifyActionHistory.value?.次回アポ) {
              item.value.次回アポ.value =
                toModifyActionHistory.value?.次回アポ.value;
            }
            return item;
          } else return item;
        });

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
      delete record["アクション履歴"];
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
