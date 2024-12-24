function addMultipleRecords({ dataList, apiToken, appId, uniqueKey }) {
  const headers = dataList.map((item) => {
    let header = item[0];
    header = headerVerification(header);
    return header;
  });

  const rows = Array.from({ length: dataList[0].length - 1 }, () => []);

  dataList.forEach((data) => {
    data.forEach((id, index) => {
      if (index !== 0) {
        rows[index - 1]?.push(id);
      }
    });
  });

  rows.forEach((row) => {
    if (row.every((cell) => cell === "")) {
      return;
    }

    let record = {};
    const uniqueVal = row[headers.indexOf(uniqueKey)]
      .trim()
      .replace(/\s+/g, "");

    headers.forEach((header, colIndex) => {
      record = recordVerification(record, header, row[colIndex]);
    });

    checkSingleRecord({
      apiToken: apiToken,
      appId: appId,
      record: record,
      uniqueKey: uniqueKey,
      uniqueVal: uniqueVal,
    });
  });
}
