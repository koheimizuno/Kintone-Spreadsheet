function recordVerification(record, header, value) {
  if (!record["アクション履歴"]) {
    record["アクション履歴"] = { value: {} };
  }

  let actionHistory = record["アクション履歴"].value;

  switch (header) {
    case "・代表者様氏名_フルネーム":
      record[header] = { value: value.replace(/\s+/g, "") };
      break;

    case "タイムスタンプ":
      actionHistory["日付"] = { value: value.split("T")[0] };
      actionHistory["営業履歴"] = { value: "限定会員" };
      actionHistory["確度"] = { value: "" };
      break;

    case "個別相談希望日時_第1希望_例_2024/01/01 10:00":
      actionHistory["次回アポ"] = { value: value };
      break;

    default:
      record[header] = { value: value };
      break;
  }

  record["アクション履歴"].value = actionHistory;

  return record;
}
