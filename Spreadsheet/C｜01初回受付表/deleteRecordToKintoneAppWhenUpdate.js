function deleteRecordToKintoneAppWhenUpdate({ e, columns, apiToken, appId }) {
  const sheet = e.source.getActiveSheet();
  const currentRowCount = sheet.getLastRow();
  const properties = PropertiesService.getScriptProperties();
  const previousRowCount = parseInt(
    properties.getProperty("rowCount") || "0",
    10
  );

  if (previousRowCount > currentRowCount) {
    console.log(
      `Row(s) deleted. Previous rows: ${previousRowCount}, Current rows: ${currentRowCount}`
    );
  } else {
    console.log("No rows deleted");
  }

  // Update the stored row count
  properties.setProperty("rowCount", currentRowCount.toString());
}
