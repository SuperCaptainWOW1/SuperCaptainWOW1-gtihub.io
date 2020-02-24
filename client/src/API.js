const API_URL = 'http://localhost:1337';

export default async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  const json = await response.json();

  return json;
}