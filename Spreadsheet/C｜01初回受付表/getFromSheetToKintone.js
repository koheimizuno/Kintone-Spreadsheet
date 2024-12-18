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

// 顧客管理
const clientManColumns = [
  { colId: "D", isDateField: false, isRequired: false },
  { colId: "E", isDateField: false, isRequired: false },
  { colId: "H", isDateField: false, isRequired: false },
  { colId: "I", isDateField: false, isRequired: false },
  { colId: "J", isDateField: false, isRequired: false },
  { colId: "K", isDateField: false, isRequired: false },
  { colId: "N", isDateField: false, isRequired: false },
  { colId: "O", isDateField: false, isRequired: false },
  { colId: "S", isDateField: false, isRequired: false },
  { colId: "T", isDateField: false, isRequired: false },
  { colId: "X", isDateField: false, isRequired: false },
  { colId: "Y", isDateField: false, isRequired: false },
  { colId: "Z", isDateField: false, isRequired: false },
  { colId: "AA", isDateField: false, isRequired: false },
  { colId: "AB", isDateField: false, isRequired: false },
  { colId: "AC", isDateField: false, isRequired: false },
  { colId: "AL", isDateField: false, isRequired: false },
  { colId: "AM", isDateField: false, isRequired: false },
  { colId: "AN", isDateField: false, isRequired: false },
  { colId: "AO", isDateField: false, isRequired: false },
  { colId: "AP", isDateField: false, isRequired: false },
  { colId: "AQ", isDateField: false, isRequired: false },
  { colId: "AR", isDateField: false, isRequired: false },
  { colId: "AS", isDateField: false, isRequired: false },
  { colId: "AT", isDateField: false, isRequired: false },
  { colId: "AU", isDateField: false, isRequired: false },
  { colId: "AV", isDateField: false, isRequired: false },
  { colId: "AW", isDateField: false, isRequired: false },
  { colId: "AY", isDateField: false, isRequired: false },
];

function addRecordsToKintone() {
  let clientManAppDataList = clientManColumns.map((item) =>
    getColumnListById(item)
  );

  addMultipleRecords({
    dataList: clientManAppDataList,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
    uniqueKey: "・代表者様氏名_フルネーム",
  });
}
