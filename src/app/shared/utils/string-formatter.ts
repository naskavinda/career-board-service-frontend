export function formatErrorMessage(message: string): string {
  if (!message) return '';
  
  // Convert to lowercase and split by underscore
  const words = message.toLowerCase().split('_');
  
  // Capitalize only the first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  // Join all words with spaces
  return words.join(' ');
}
