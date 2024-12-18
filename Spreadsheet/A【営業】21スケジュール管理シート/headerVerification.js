function headerVerification(header) {
  if (header === "お名前") {
    return "・代表者様氏名_フルネーム";
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
