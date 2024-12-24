let placeCount = 0;
let incomeCount = 0;

function headerVerification(header) {
  switch (header) {
    case "・勤務先":
      placeCount++;
      return placeCount === 1
        ? "・勤務先_代表者"
        : placeCount === 2
        ? "・勤務先_パートナー"
        : header;
    case "・年収":
      incomeCount++;
      return incomeCount === 1
        ? "・年収_代表者"
        : incomeCount === 2
        ? "・年収_パートナー"
        : header;
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
        { regex: /\n/g, replacement: "_" },
      ];

      for (const { regex, replacement } of replacements) {
        header = header.replace(regex, replacement);
      }

      return header;
  }
}
