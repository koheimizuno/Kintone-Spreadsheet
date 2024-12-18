function addSingleRecord({ apiToken, appId, record, uniqueKey, uniqueVal }) {
  const query = `${uniqueKey} = "${uniqueVal}"`;
  const options = {
    method: "get",
    headers: {
      "X-Cybozu-API-Token": apiToken,
    },
    muteHttpExceptions: true,
  };

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
      const postOptions = {
        method: "post",
        headers: {
          "X-Cybozu-API-Token": apiToken,
          "Content-Type": "application/json",
        },
        payload: JSON.stringify({
          app: appId,
          record: record,
        }),
        muteHttpExceptions: true,
      };

      const postResponse = UrlFetchApp.fetch(
        `${kintoneDomain}/k/v1/record.json`,
        postOptions
      );
      if (postResponse.getResponseCode() !== 200) {
        console.error(`Failed to add a row : ${postResponse.getContentText()}`);
      } else {
        console.log(`Successfully added a row`);
      }
    }
  } catch (error) {
    console.error(
      `Error checking for existing record or adding row : ${error.message}`
    );
  }
}
