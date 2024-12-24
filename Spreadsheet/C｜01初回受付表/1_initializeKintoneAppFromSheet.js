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
const currentStatusFieldKey = "現在のステータス";
const limitedUserFieldKey =
  "Gハウスで建築検討することを前提とし_Gハウス限定会員への入会を希望しますか";

// 顧客管理
const clientManColumns = [
  { colId: uniqueGColumnLetter },
  { colId: "E" },
  { colId: "H" },
  { colId: "I" },
  { colId: "J" },
  { colId: "K" },
  { colId: "N" },
  { colId: "O" },
  { colId: "S" },
  { colId: "T" },
  { colId: "X" },
  { colId: "Y" },
  { colId: "Z" },
  { colId: "AA" },
  { colId: "AB" },
  { colId: "AC" },
  { colId: "AL" },
  { colId: "AM" },
  { colId: "AN" },
  { colId: "AO" },
  { colId: "AP" },
  { colId: "AQ" },
  { colId: "AR" },
  { colId: "AS" },
  { colId: "AT" },
  { colId: "AU" },
  { colId: "AV" },
  { colId: "AW" },
  { colId: "AX" },
  { colId: "AY" },
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
