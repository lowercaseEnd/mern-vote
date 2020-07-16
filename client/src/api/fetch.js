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
  let create = await fetch("/poll/create_poll", {
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
  let ans = await create.json();
  return ans;
}

//получение списка голосований
async function getPolls() {
  let polls = await fetch("/poll/polls");
  let ans = await polls.json();
  return ans;
}

//выход из аккаунта
async function logout(data) {
  await fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": document.cookie
    },
    cache: "default",
    credentials: "include",
    body: JSON.stringify(data)
  });
}

//проголосовать
async function vote(username, id, option) {
  let res = await fetch(`/poll/${username}/polls/${id}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    cache: "default",
    credentials: "include",
    body: JSON.stringify({
      "selectedOption": option
    })
  });
  let ans = await res.json();
  return ans;
}

export {
  auth,
  createPoll,
  getPolls,
  logout,
  vote
};