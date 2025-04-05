export const sumByCountSize = (data) => {
  const updatedList = data.reduce((acc, item) => {
    const existing = acc.find((el) => el.size === item.size);
    if (existing) {
      const existingCount = existing.fields.find(
        (field) => field.label === "Count" || field.label === "Container Count"
      );
      const newCount = item.fields.find(
        (field) => field.label === "Count" || field.label === "Container Count"
      );
      if (existingCount && newCount) {
        existingCount.value += newCount.value;
      }
    } else {
      acc.push(JSON.parse(JSON.stringify(item)));
    }
    return acc;
  }, []);

  return updatedList
};
