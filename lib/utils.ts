import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const sanitizeString = (str: string): string => {
  return str.replace(/[^a-zA-Z\-_0-9. ]/g, '');
};

const sanitizeMultipleStrings = (strArray: Array<string>): Array<string> => {
  return strArray.map((item) => {
    return sanitizeString(item);
  });
};

export { cn, sanitizeString, sanitizeMultipleStrings };
