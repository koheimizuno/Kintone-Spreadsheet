function addMultipleRecords({ dataList, apiToken, appId, uniqueKey }) {
  const headers = dataList.map((item) => item[0][0]);

  const rows = Array.from({ length: dataList[0].length - 1 }, () => []);

  dataList.forEach((data) => {
    data.forEach((id, index) => {
      if (index !== 0) {
        rows[index - 1]?.push(id[0]);
      }
    });
  });

  rows.forEach((row) => {
    if (row.every((cell) => cell === "")) {
      return;
    }

    const record = {};
    const id = row[headers.indexOf(uniqueKey)];

    headers.forEach((header, colIndex) => {
      record[header] = { value: row[colIndex] };
    });

    addSingleRecord({
      apiToken: apiToken,
      appId: appId,
      record: record,
      uniqueKey: uniqueKey,
      uniqueVal: id,
    });
  });
}
