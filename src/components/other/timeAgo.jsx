import React from "react";
export function timeAgo(isoString, t) {
  const date = new Date(isoString + "Z");
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} ${t("seconds ago")}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${t("minutes ago")}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${t("hours ago")}`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${t("days ago")}`;

  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
