function getRecordsFromKintone({ apiToken, appId }) {
  const options = {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": apiToken,
    },
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(
      `${kintoneDomain}/k/v1/records.json?app=${appId}`,
      options
    );
    const jsonResponse = JSON.parse(response.getContentText());
    const records = jsonResponse.records;
    return records;
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    return null;
  }
}
