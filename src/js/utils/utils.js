// js/utils/utils.js

export function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}

export function normalizeKey(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}

export function addUnique(list, item) {
  if (!list.includes(item)) {
    list.push(item);
  }
}


