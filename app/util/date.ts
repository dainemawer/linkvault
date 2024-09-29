export const formatDate = (date: Date) => {
  const pad = (num: number) => String(num).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // Months are 0-based
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;

};

export const isTimestampInCurrentWeek = (timestamp: number) => {
  const date = new Date(timestamp);

  // Get the current date
  const today = new Date();

  // Calculate the start of the current week (Monday)
  const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ...)
  const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Difference to get to Monday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0); // Set to midnight

  // Calculate the end of the current week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // End of the day

  // Check if the given date is within the current week
  return date >= startOfWeek && date <= endOfWeek;
}