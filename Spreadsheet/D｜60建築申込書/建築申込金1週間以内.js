function sendToChat() {
  // スプレッドシートIDでスプレッドシートを開く
  var spreadsheet = SpreadsheetApp.openById('1KmfnkiArBtTl8e0RUjWqd-6vBIj8uhv-l6HIvS73aIA');
  var sheet = spreadsheet.getSheetByName('フォームの回答 1');
  
  // シートが見つからない場合のエラーハンドリング
  if (!sheet) {
    Logger.log("シートが見つかりません: 'フォームの回答 1'");
    return;
  }

  // シートのデータ範囲を取得
  var data = sheet.getDataRange().getValues();
  
  // 新しいWebhook URL
  var webhookUrl = "https://chat.googleapis.com/v1/spaces/AAAAeu9_tk8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=J2xwQ1sqgct4nUcZIBFq0CAi3szCPqU4xVFezl3-dyo";

  // メンションを追加するための担当者名とメンションの対応マッピング
  var mentionMapping = {
    "佐古": "@佐古祐太",
    "田畑": "@田畑美香",
    "德田": "@德田耕明",
    "徳田": "@德田耕明",
    "吉田": "@吉田祐",
    "杉村": "@杉村悠斗",
    "西": "@西俊幸",
    "金村": "@金村晃功"
  };
  
  // 現在の時間を取得
  var now = new Date();

  // メッセージのフォーマット
  var message = {
    "text": ""
  };

  // 行ごとに処理（2行目からスタートする）
  for (var i = 1; i < data.length; i++) {
    var timestamp = data[i][1]; // B列のタイムスタンプ（入力されている値）
    var paymentStatus = data[i][5]; // F列の建築申込金支払い状況
    var hCol = data[i][7]; // H列（担当者名）
    var customerName = data[i][8]; // I列（お客様名）

    // B列がDate型かつ時刻まで入っている場合（時刻が00:00:00ではない場合）
    if (timestamp instanceof Date && timestamp.getHours() !== 0 && timestamp.getMinutes() !== 0 && timestamp.getSeconds() !== 0) {
      // 1週間（168時間）経過していて、F列が空白の場合
      if (paymentStatus === "" && now - timestamp >= 168 * 60 * 60 * 1000) {
        // H列の担当者に基づき、メンションを取得
        var mention = mentionMapping[hCol] || hCol; // メンションがなければそのまま担当者名

        // メッセージを生成
        message.text += mention + "\n";
        message.text += "お客様名：" + customerName + "\n";
        message.text += "建築申込から1週間経過しましたが、建築申込金が入金されていません。\n";
      }
    }
  }
  
  // メッセージがあればWebhookにデータを送信
  if (message.text) {
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(message)
    };
    UrlFetchApp.fetch(webhookUrl, options);
  }
}
