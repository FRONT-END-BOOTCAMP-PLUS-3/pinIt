export const extractTwoWordsFromAddress = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};
