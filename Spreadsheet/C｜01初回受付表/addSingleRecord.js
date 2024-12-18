function addSingleRecord({ apiToken, appId, record }) {
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
