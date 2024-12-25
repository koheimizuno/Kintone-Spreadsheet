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

  if (header === "タイムスタンプ") {
    value = convertSerialToKintoneDate(value);
  }

  record = recordVerification(record, header, value);

  if (columnLetter === "T" && value === "希望する") {
    record[currentStatusFieldKey] = { value: "限定会員" };
    console.log("Successfully updated 限定会員!");
  }

  let originalActionHistory = recordByID["アクション履歴"].value;
  let toModifyActionHistory = record["アクション履歴"];

  if (
    originalActionHistory[originalActionHistory.length - 1].value["営業履歴"]
      .value === "資料請求"
  ) {
    originalActionHistory.push(toModifyActionHistory);
    record["アクション履歴"] = { value: originalActionHistory };
  } else {
    console.log("The current action is not 「資料請求」.");
    originalActionHistory = originalActionHistory.map((item) => {
      if (item.value.営業履歴.value === "限定会員") {
        if (toModifyActionHistory.value?.日付) {
          item.value.日付.value = toModifyActionHistory.value?.日付.value;
        }
        if (toModifyActionHistory.value?.次回アポ) {
          item.value.次回アポ.value = convertSerialToKintoneDate(
            toModifyActionHistory.value?.次回アポ.value
          );
          console.log(toModifyActionHistory.value?.次回アポ.value);
          console.log(item.value.次回アポ.value);
        }
        return item;
      } else return item;
    });

    record["アクション履歴"] = { value: originalActionHistory };
  }

  updateSingleRecord({
    apiToken: apiToken,
    appId: appId,
    recordId: recordByID.$id.value,
    record: record,
  });
}
