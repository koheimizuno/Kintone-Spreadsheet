function recordVerification(record, header, value) {
  switch (header) {
    case "・代表者様氏名_フルネーム":
      record[header] = { value: value.replace(/\s+/g, "") };
      break;

    case "日付":
      record["アクション履歴"] = {
        value: {
          [header]: { value: value.split("T")[0] },
          営業履歴: { value: "資料請求" },
        },
      };
      break;

    default:
      record[header] = { value: value };
      break;
  }

  return record;
}
