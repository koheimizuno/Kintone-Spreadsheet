function getRecordByField({ apiToken, appId, uniqueKey, uniqueVal }) {
  const query = `${uniqueKey} = "${uniqueVal}"`;
  const options = {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": apiToken,
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(
    `${kintoneDomain}/k/v1/records.json?app=${appId}&query=${encodeURIComponent(
      query
    )}`,
    options
  );

  if (response.getResponseCode() !== 200) {
    console.error(`Failed to retrieve record: ${response.getContentText()}`);
    return null;
  }

  const data = JSON.parse(response.getContentText());
  if (data.records?.length === 0) {
    return false;
  }

  return data.records[0];
}
