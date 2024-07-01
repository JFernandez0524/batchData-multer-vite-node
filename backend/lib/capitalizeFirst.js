export default function capitalizeFirst(string) {
  const lowercase = string.toLowerCase();
  const capitalize = lowercase.charAt(0).toUpperCase() + string.slice(1);
  return capitalize;
}
