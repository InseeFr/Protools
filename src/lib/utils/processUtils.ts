export function deleteDuplicatesByKey(json: any): void {
  if (json && json.data && Array.isArray(json.data)) {
    const uniqueKeys = new Set();
    json.data = json.data.filter((element: any) => {
      if (uniqueKeys.has(element.key)) {
        return false;
      } else {
        uniqueKeys.add(element.key);
        return true;
      }
    });
  }
}