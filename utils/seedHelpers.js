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
  if (arr.length > 0) {
    const newObj = { ...arr[0] };
    const keys = Object.keys(newObj);
    keys.forEach((key) => {
      if (newObj[key] === "true") newObj[key] = true;
      else if (newObj[key] === "false") newObj[key] = false;
    });
    return [newObj];
  } else return [];
};
