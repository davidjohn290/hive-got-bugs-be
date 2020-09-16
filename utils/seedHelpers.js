exports.makeRefObj = (array, keyTarget, valueTarget) => {
  const lookup = {};
  array.forEach((obj) => {
    lookup[obj[keyTarget]] = obj[valueTarget];
  });
  return lookup;
};

exports.replaceKey = (arr, ref, newKey, oldKey) => {
  const formattedObj = arr.map((item) => {
    const newItem = { ...item };

    newItem[newKey] = ref[newItem[oldKey]];
    delete newItem[oldKey];

    return newItem;
  });

  return formattedObj;
};

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
