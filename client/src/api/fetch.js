//авторизация пользователя
async function auth(type, data) {
  let response = await fetch(`/auth/${type}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
    },
    cache: "default",
    credentials: "include",
    body: JSON.stringify(data)
  });
  let resJSON = await response.json();
  return resJSON;
}
//создание голосования
async function createPoll(data) {
  let first = await fetch("/poll/create_poll", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "Set-Cookie": document.cookie
    },
    cache: "default",
    credentials: "include",
    body: JSON.stringify(data)
  });
  let ans = await first.json();
  return ans;
}

export {
  auth,
  createPoll
};