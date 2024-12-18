let placeCount = 0;
let incomeCount = 0;

function addMultipleRecords({ dataList, apiToken, appId, uniqueKey }) {
  const headers = dataList.map((item) => {
    let header = item[0][0].replace(/（/g, "_").replace(/）/g, "");

    if (header === "・勤務先") {
      placeCount++;
      if (placeCount === 1) {
        return "・勤務先_代表者";
      } else if (placeCount === 2) {
        return "・勤務先_パートナー";
      }
    }

    if (header === "・年収") {
      incomeCount++;
      if (incomeCount === 1) {
        return "・年収_代表者";
      } else if (incomeCount === 2) {
        return "・年収_パートナー";
      }
    }

    if (header.includes("？")) {
      header = header.replace(/？/g, "");
    }

    if (header.includes("。")) {
      header = header.replace(/。/g, "");
    }

    if (header.includes("、")) {
      header = header.replace(/、/g, "_");
    }

    if (header.includes("：")) {
      header = header.replace(/：/g, "_");
    }

    if (header.includes("「")) {
      header = header.replace(/「/g, "・");
    }

    if (header.includes("」")) {
      header = header.replace(/」/g, "・");
    }

    if (header.includes("\n")) {
      header = header.replace(/\n/g, "_n");
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
    const uniqueVal = row[headers.indexOf(uniqueKey)].trim();

    headers.forEach((header, colIndex) => {
      record[header] = { value: row[colIndex] };
    });

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
        updateSingleRecord({
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
  });
}
