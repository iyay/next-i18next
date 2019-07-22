export default function getCookie(cookies, name) {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return false;
}