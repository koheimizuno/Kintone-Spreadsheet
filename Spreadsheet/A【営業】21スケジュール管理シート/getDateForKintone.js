function getDateForKintone(value) {
  const date = new Date(value); // Create a Date object
  const offset = date.getTimezoneOffset(); // Get time zone offset in minutes
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000); // Adjust for local time
  return adjustedDate.toISOString().split("T");
}
