function headerVerification(header) {
  switch (header) {
    case "お名前":
      return "・代表者様氏名_フルネーム";
    case "資料送付":
      return "日付";
    default:
      const replacements = [
        { regex: /（/g, replacement: "_" },
        { regex: /）/g, replacement: "" },
        { regex: /？/g, replacement: "" },
        { regex: /。/g, replacement: "" },
        { regex: /、/g, replacement: "_" },
        { regex: /：/g, replacement: "_" },
        { regex: /「/g, replacement: "・" },
        { regex: /」/g, replacement: "・" },
        { regex: /\n/g, replacement: "_n" },
      ];

      for (const { regex, replacement } of replacements) {
        header = header.replace(regex, replacement);
      }

      return header;
  }
}
