function updateRecordWhenUpdateCell({ e, columns, apiToken, appId }) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  let value = e.value;

  // Get the row and column of the edited cell
  const row = range.getRow();
  const column = range.getColumn();
  const columnLetter = String.fromCharCode(64 + column);
  let header = sheet.getRange(headerRowIndex, column).getValue();

  if (!header) {
    console.log("Not header!");
    return;
  }

  const isFieldOfClientManApp = columns.some(
    (column) => column.colId === columnLetter
  );

  if (!isFieldOfClientManApp) {
    console.log("Not field of client man app!");
    return;
  }

  header = headerVerification(header);
  const uniqueVal = sheet
    .getRange(row, columnLetterToIndex(uniqueGColumnLetter))
    .getValue()
    .replace(/\s+/g, "");

  const recordByID = getRecordByField({
    apiToken: apiToken,
    appId: appId,
    uniqueKey: uniqueGFieldKey,
    uniqueVal: uniqueVal,
  });

  if (!recordByID) {
    return console.error("The record does not exist!");
  }

  let record = {};

  if (header === "日付") {
    const date = new Date((value - 25569) * 86400000); // Adjust for Google Sheets epoch
    value = Utilities.formatDate(
      date,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );
  }

  record = recordVerification(record, header, value);

  let originalActionHistory = recordByID["アクション履歴"].value;

  if (originalActionHistory.length !== 0) {
    console.log("There are actions after 「資料請求」.");
    originalActionHistory = originalActionHistory.map((item) => {
      if (item.value.営業履歴.value === "資料請求") {
        item.value.日付.value = toModifyActionHistory.value.日付.value;
        return item;
      } else return item;
    });
    record["アクション履歴"] = { value: originalActionHistory };
  } else {
    record["アクション履歴"] = {
      value: [record["アクション履歴"]],
    };
  }

  updateSingleRecord({
    apiToken: apiToken,
    appId: appId,
    recordId: recordByID.$id.value,
    record: record,
  });
}
