function convertSerialToKintoneDate(serial, forDatetime = false) {
  // Excel's epoch starts on December 30, 1899
  let epoch = new Date(1899, 11, 30);

  // Add the serial number as days
  epoch.setDate(epoch.getDate() + Math.floor(serial));

  // Handle the fractional part of the day
  let fractionalDay = serial % 1; // Fractional part of the serial
  let totalSecondsInDay = Math.round(fractionalDay * 24 * 60 * 60); // Convert to seconds

  // Derive hours, minutes, and seconds
  let hours = Math.floor(totalSecondsInDay / 3600);
  let minutes = Math.floor((totalSecondsInDay % 3600) / 60);
  let seconds = totalSecondsInDay % 60;

  // Format the date for Kintone
  let year = epoch.getFullYear();
  let month = String(epoch.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  let day = String(epoch.getDate()).padStart(2, "0");
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:${formattedSeconds}+09:00`;
}
