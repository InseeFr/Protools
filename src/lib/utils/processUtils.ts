export function deleteDuplicatesByKey(json: any): void {
  if (json && json.data && Array.isArray(json.data)) {
    json.data.sort((a: any, b: any) => b.version - a.version);

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