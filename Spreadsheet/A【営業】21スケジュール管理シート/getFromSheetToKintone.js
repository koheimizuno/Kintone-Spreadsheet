const kintoneDomain = "https://lubgvt14qe4a.cybozu.com";
const appAccess = {
  clientManApp: {
    apiToken: "hB4jVlUAnoKwXLJjZJf3C9vp56CfYJycJIxpOg2j",
    appId: "6",
  },
};

const mainSheet =
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "【顧客リスト】2408～2507"
  );

const headerRowIndex = 5;
const currentDataRowCount = mainSheet.getLastRow() - 4;
const uniqueGFieldKey = "・代表者様氏名_フルネーム";
const uniqueGColumnLetter = "G";

// 顧客管理
const clientManColumns = [
  { colId: uniqueGColumnLetter, isDateField: false },
  { colId: "T", isDateField: false },
  { colId: "U", isDateField: false },
  { colId: "V", isDateField: false },
  { colId: "W", isDateField: false },
];

function addRecordsToKintone() {
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
