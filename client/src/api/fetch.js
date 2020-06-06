async function auth(type, data) {
  let response = await fetch(`http://localhost:4000/auth/${type}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
    },
    cache: "default",
    credentials: "same-origin",
    body: JSON.stringify(data)
  });
  let resJSON = await response.json();
  return resJSON;
}

export {
  auth
};