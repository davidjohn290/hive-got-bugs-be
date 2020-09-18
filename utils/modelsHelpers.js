exports.formatBooleans = (arr) => {
  const formattedArr = arr.map((item) => {
    const newItem = { ...item };
    const keys = Object.keys(newItem);
    keys.forEach((key) => {
      if (newItem[key] === "true") newItem[key] = true;
      else if (newItem[key] === "false") newItem[key] = false;
    });
    return newItem;
  });
  return formattedArr;
};
