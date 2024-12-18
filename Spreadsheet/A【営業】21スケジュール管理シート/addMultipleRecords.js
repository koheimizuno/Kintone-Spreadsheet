function addMultipleRecords({ dataList, apiToken, appId, uniqueKey }) {
  const headers = dataList.map((item) => {
    let header = item[0][0].replace(/（/g, "_").replace(/）/g, "");

    if (header === "お名前") {
      return "・代表者様氏名_フルネーム";
    }

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
    const uniqueVal = row[headers.indexOf(uniqueKey)]
      .trim()
      .replace(/\s+/g, "");

    headers.forEach((header, colIndex) => {
      if (header === "・代表者様氏名_フルネーム") {
        record[header] = { value: row[colIndex].replace(/\s+/g, "") };
      } else {
        record[header] = { value: row[colIndex] };
      }
    });

    addSingleRecord({
      apiToken: apiToken,
      appId: appId,
      record: record,
      uniqueKey: uniqueKey,
      uniqueVal: uniqueVal,
    });
  });
}
