export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const descendingComparator = (a, b, orderBy) => {
  const valueA = getNestedValue(a, orderBy);
  const valueB = getNestedValue(b, orderBy);

  if (orderBy === 'timestamp') {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  }

  // Handle undefined or null values appropriately
  if (valueA == null && valueB == null) {
    return 0;
  } else if (valueA == null) {
    return 1;
  } else if (valueB == null) {
    return -1;
  }

  // Perform descending comparison
  if (orderBy === 'index') {
    // Ensure numeric comparison for index
    return valueB - valueA;
  } else if (typeof valueA === 'string' && typeof valueB === 'string') {
    return valueB.localeCompare(valueA);
  } else {
    return valueB - valueA;
  }
};

const getNestedValue = (obj, path) => {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    value = value ? value[key] : null;
  }
  return value;
};
