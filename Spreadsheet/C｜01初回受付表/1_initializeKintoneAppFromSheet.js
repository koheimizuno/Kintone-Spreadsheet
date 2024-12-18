const kintoneDomain = "https://lubgvt14qe4a.cybozu.com";
const appAccess = {
  clientManApp: {
    apiToken: "hB4jVlUAnoKwXLJjZJf3C9vp56CfYJycJIxpOg2j",
    appId: "6",
  },
};

const mainSheet =
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "初回受付表（2024.09~）"
  );

const headerRowIndex = 2;
const currentDataRowCount = mainSheet.getLastRow() - 1;
const uniqueGFieldKey = "・代表者様氏名_フルネーム";
const uniqueGColumnLetter = "D";

// 顧客管理
const clientManColumns = [
  { colId: uniqueGColumnLetter, isDateField: false },
  { colId: "E", isDateField: false },
  { colId: "H", isDateField: false },
  { colId: "I", isDateField: false },
  { colId: "J", isDateField: false },
  { colId: "K", isDateField: false },
  { colId: "N", isDateField: false },
  { colId: "O", isDateField: false },
  { colId: "S", isDateField: false },
  { colId: "T", isDateField: false },
  { colId: "X", isDateField: false },
  { colId: "Y", isDateField: false },
  { colId: "Z", isDateField: false },
  { colId: "AA", isDateField: false },
  { colId: "AB", isDateField: false },
  { colId: "AC", isDateField: false },
  { colId: "AL", isDateField: false },
  { colId: "AM", isDateField: false },
  { colId: "AN", isDateField: false },
  { colId: "AO", isDateField: false },
  { colId: "AP", isDateField: false },
  { colId: "AQ", isDateField: false },
  { colId: "AR", isDateField: false },
  { colId: "AS", isDateField: false },
  { colId: "AT", isDateField: false },
  { colId: "AU", isDateField: false },
  { colId: "AV", isDateField: false },
  { colId: "AW", isDateField: false },
  { colId: "AX", isDateField: false },
  { colId: "AY", isDateField: false },
];

function initializeKintoneAppFromSheet() {
  let clientManAppDataList = clientManColumns.map((item) =>
    getColumnListById(item)
  );

  addMultipleRecords({
    dataList: clientManAppDataList,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
    uniqueKey: uniqueGFieldKey,
  });
}
