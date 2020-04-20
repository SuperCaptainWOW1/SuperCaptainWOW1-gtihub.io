const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  const json = await response.json();

  return json;
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
  const json = await response.json();

  return json;
}