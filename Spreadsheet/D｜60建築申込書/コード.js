function countWithoutGrayFill(rangeB, rangeH) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataB = sheet.getRange(rangeB).getValues();
  var dataH = sheet.getRange(rangeH).getValues();
  var bgColors = sheet.getRange(rangeH).getBackgrounds();
  var count = 0;
  
  // カウントしたい名前のリスト
  var names = ["佐古", "田畑", "德田","田上","吉田","杉村","西"]; // ここに追加したい名前を入れられるよ！

  for (var i = 0; i < dataB.length; i++) {
    var date = new Date(dataB[i][0]);
    // 背景色がグレー（#bfbfbf）じゃない、かつH列がリスト内の名前の場合
    if (names.indexOf(dataH[i][0]) != -1 && date.getFullYear() == 2024 && date.getMonth() + 1 == 8 && bgColors[i][0] != "#bfbfbf") {
      count++;
    }
  }

  return count;
}

