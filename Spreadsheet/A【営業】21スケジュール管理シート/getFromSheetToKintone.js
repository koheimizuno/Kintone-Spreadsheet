const kintoneDomain = "https://lubgvt14qe4a.cybozu.com";
const appAccess = {
  clientManApp: {
    apiToken: "hB4jVlUAnoKwXLJjZJf3C9vp56CfYJycJIxpOg2j",
    appId: "6",
  },
  businessProcessApp: {
    apiToken: "aUoQGeBrMrU6pgIMDOIosia5P7yqkLvZbAhgHMoX",
    appId: "21",
  },
  contactManApp: {
    apiToken: "u33RgrJmimilhnpniQfASOdyRKfgDfrSBMKfcdDR",
    appId: "22",
  },
};

const mainSheet =
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "【顧客リスト】2408～2507"
  );

const headerRowIndex = 5;
const currentDataRowCount = mainSheet.getLastRow() - 4;

// 顧客管理
const clientManColumns = [
  { colId: "A", isDateField: false, isRequired: true },
  { colId: "G", isDateField: false, isRequired: true },
  { colId: "F", isDateField: false, isRequired: true },
  { colId: "T", isDateField: false, isRequired: true },
  { colId: "U", isDateField: false, isRequired: true },
  { colId: "V", isDateField: false, isRequired: true },
  { colId: "W", isDateField: false, isRequired: true },
];

// 営業進捗
const businessProcessColumns = [
  { colId: "A", isDateField: false, isRequired: true },
  { colId: "B", isDateField: false, isRequired: true },
  { colId: "C", isDateField: true, isRequired: true },
  { colId: "E", isDateField: false, isRequired: true },
  { colId: "H", isDateField: false, isRequired: false },
  { colId: "I", isDateField: false, isRequired: true },
  { colId: "J", isDateField: false, isRequired: true },
  { colId: "K", isDateField: false, isRequired: true },
  { colId: "L", isDateField: false, isRequired: true },
  { colId: "M", isDateField: false, isRequired: false },
  { colId: "N", isDateField: false, isRequired: false },
  { colId: "O", isDateField: false, isRequired: true },
  { colId: "P", isDateField: true, isRequired: false },
  { colId: "Q", isDateField: false, isRequired: false },
  { colId: "R", isDateField: false, isRequired: false },
  { colId: "S", isDateField: false, isRequired: false },
  { colId: "X", isDateField: false, isRequired: true },
  { colId: "Y", isDateField: true, isRequired: false },
  { colId: "AL", isDateField: false, isRequired: false },
];

// 問合せ管理
const contactManColumns = [
  { colId: "A", isDateField: false, isRequired: true },
  { colId: "AM", isDateField: false, isRequired: false },
  { colId: "AI", isDateField: true, isRequired: false },
  { colId: "AJ", isDateField: true, isRequired: false },
  { colId: "AK", isDateField: true, isRequired: false },
  { colId: "Z", isDateField: false, isRequired: false },
  { colId: "AA", isDateField: true, isRequired: false },
  { colId: "AB", isDateField: false, isRequired: false },
  { colId: "AC", isDateField: true, isRequired: false },
  { colId: "AD", isDateField: false, isRequired: false },
  { colId: "AE", isDateField: true, isRequired: false },
  { colId: "AF", isDateField: false, isRequired: false },
  { colId: "AG", isDateField: true, isRequired: false },
  { colId: "AH", isDateField: true, isRequired: false },
];

function addRecordsToKintone() {
  let clientManAppDataList = clientManColumns.map((item) =>
    getColumnListById(item)
  );
  let businessProcessDataList = businessProcessColumns.map((item) =>
    getColumnListById(item)
  );
  let contactManAppDataList = contactManColumns.map((item) =>
    getColumnListById(item)
  );

  addMultipleRecords({
    dataList: clientManAppDataList,
    apiToken: appAccess.clientManApp.apiToken,
    appId: appAccess.clientManApp.appId,
    uniqueKey: "顧客番号",
  });

  // addMultipleRecords({
  //   dataList: businessProcessDataList,
  //   apiToken: `${appAccess.businessProcessApp.apiToken}, ${appAccess.clientManApp.apiToken}`,
  //   appId: appAccess.businessProcessApp.appId,
  //   uniqueKey: "顧客番号",
  // });

  // addMultipleRecords({
  //   dataList: contactManAppDataList,
  //   apiToken: `${appAccess.contactManApp.apiToken}, ${appAccess.clientManApp.apiToken}`,
  //   appId: appAccess.contactManApp.appId,
  //   uniqueKey: "顧客番号",
  // });
}
