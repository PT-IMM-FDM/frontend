import { Badge } from "flowbite-react";

export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Format tanggal menjadi DD/MM/YYYY
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Format waktu menjadi HH:MM:SS
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate}, ${formattedTime}`;
}

export const formatResultFDM = (value) => {
  if (value === "FIT") {
    return "FIT";
  } else if (value === "FIT_FOLLOW_UP") {
    return "FIT FOLLOW UP";
  } else {
    return "UNFIT";
  }
}





