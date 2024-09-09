const sanitizeString = (str: string): string => {
  return str.replace(/[^a-zA-Z\-_0-9. ]/g, '');
};

const sanitizeMultipleStrings = (strArray: Array<string>): Array<string> => {
  return strArray.map((item) => {
    return sanitizeString(item);
  });
};

export { sanitizeString, sanitizeMultipleStrings };