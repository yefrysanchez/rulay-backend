const stampTime = () => {
  const now = new Date();
  // ISO 8601 format
  const isoString = now.toISOString();

  // Local date and time string
  const localString = now.toLocaleString();

  // Custom format (e.g., YYYY-MM-DD)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${month}-${day}-${year}`;
};

module.exports = stampTime;
