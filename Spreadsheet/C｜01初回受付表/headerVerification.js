let placeCount = 0;
let incomeCount = 0;

function headerVerification(header) {
  if (header === "・勤務先") {
    placeCount++;
    if (placeCount === 1) {
      return "・勤務先_代表者";
    } else if (placeCount === 2) {
      return "・勤務先_パートナー";
    }
  }

  if (header === "・年収") {
    incomeCount++;
    if (incomeCount === 1) {
      return "・年収_代表者";
    } else if (incomeCount === 2) {
      return "・年収_パートナー";
    }
  }

  if (header.includes("（")) {
    header = header.replace(/（/g, "_");
  }

  if (header.includes("）")) {
    header = header.replace(/）/g, "");
  }

  if (header.includes("？")) {
    header = header.replace(/？/g, "");
  }

  if (header.includes("。")) {
    header = header.replace(/。/g, "");
  }

  if (header.includes("、")) {
    header = header.replace(/、/g, "_");
  }

  if (header.includes("：")) {
    header = header.replace(/：/g, "_");
  }

  if (header.includes("「")) {
    header = header.replace(/「/g, "・");
  }

  if (header.includes("」")) {
    header = header.replace(/」/g, "・");
  }

  if (header.includes("\n")) {
    header = header.replace(/\n/g, "_n");
  }

  return header;
}
