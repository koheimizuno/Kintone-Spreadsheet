let placeCount = 0;
let incomeCount = 0;

function addMultipleRecords({ dataList, apiToken, appId, uniqueKey }) {
  const headers = dataList.map((item) => {
    let header = item[0][0];
    header = headerVerification(header);
    return header;
  });

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
    const uniqueVal = row[headers.indexOf(uniqueKey)].trim();

    headers.forEach((header, colIndex) => {
      record[header] = { value: row[colIndex] };
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
