
export const pascalToWord = pascal => {
  const result = pascal.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);

}

export const formatDate = timestamp => {

  const date = new Date(timestamp);
  return date.toDateString()

}