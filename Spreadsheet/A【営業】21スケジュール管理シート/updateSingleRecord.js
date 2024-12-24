function updateSingleRecord({ apiToken, appId, recordId, record }) {
  const options = {
    method: "PUT",
    headers: {
      "X-Cybozu-API-Token": apiToken,
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      app: appId,
      id: recordId,
      record: record,
    }),
    muteHttpExceptions: true,
  };

  console.log("record", record);

  try {
    const response = UrlFetchApp.fetch(
      `${kintoneDomain}/k/v1/record.json`,
      options
    );

    if (response.getResponseCode() !== 200) {
      console.error(`Failed to update a record: ${response.getContentText()}`);
    } else {
      console.log(`Successfully updated record ID: ${recordId}`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}
