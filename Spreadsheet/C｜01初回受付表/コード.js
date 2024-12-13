function onEdit(e) {
  if (!e) {
    return;
  }

  var sheet = e.source.getActiveSheet();
  var range = e.range;
  
  // 初回受付表（2024.09~）シートのT列が編集された時
  if (sheet.getName() === '初回受付表（2024.09~）' && range.getColumn() === 20 && range.getValue() === '希望する') {
    checkAndSetCheckbox(range.getRow());
  }
}

// 既存の全行に対して処理を実行する関数
function checkExistingRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('初回受付表（2024.09~）');
  var lastRow = sheet.getLastRow();
  
  for (var row = 2; row <= lastRow; row++) { // 2行目から最後の行までをチェック
    var valueT = sheet.getRange(row, 20).getValue(); // T列の値を取得
    if (valueT === '希望する') {
      checkAndSetCheckbox(row);
    }
  }
}

// 指定された行に対してチェックボックスを設定する関数
function checkAndSetCheckbox(row) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('初回受付表（2024.09~）');
  var nameToCheckD = normalizeString(sheet.getRange(row, 4).getValue()); // D列の名前を取得して正規化
  var nameToCheckJ = normalizeString(sheet.getRange(row, 10).getValue()); // J列の名前を取得して正規化
  Logger.log("Checking row: " + row + " D列: " + nameToCheckD + " J列: " + nameToCheckJ);

  var targetSpreadsheetId = '1iZUQCYGZ3M-iWdQpVYUGOzrfFXr4QgPQRg6O8C8lyA4';
  var targetSheetName = '【顧客リスト】2408～2507';
  
  var targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheetId);
  var targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
  var targetData = targetSheet.getRange('G2:I' + targetSheet.getLastRow()).getValues(); // G列とI列を取得
  
  for (var i = 0; i < targetData.length; i++) {
    var normalizedTargetName = normalizeString(targetData[i][0]); // G列の名前を正規化
    Logger.log("Comparing with: " + normalizedTargetName);
    // G列の値とD列またはJ列の値を比較
    if (normalizedTargetName === nameToCheckD || normalizedTargetName === nameToCheckJ) {
      Logger.log("Match found: " + targetData[i][0]);
      var checkboxRange = targetSheet.getRange(i + 2, 9); // I列のチェックボックスセルを取得
      checkboxRange.setValue(true); // チェックボックスをオンにする
      break;
    }
  }
}

// 文字列を正規化して比較しやすくする関数（全角・半角スペースを除去）
function normalizeString(str) {
  return str.replace(/\s+/g, '').trim(); // すべてのスペース（全角・半角）を削除し、前後の空白も削除
}
function testFormSubmit() {
  var e = {
    values: [
      "2024-09-23",  // 0: タイムスタンプ
      "お名前",      // 1: お名前
      "希望する",    // 19: T列のデータとして「希望する」
      "example@example.com" // 16: Q列（メールアドレス）
    ]
  };
  onFormSubmit(e);
}
