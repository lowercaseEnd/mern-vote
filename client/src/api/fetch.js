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
async function vote(username, id, data) {
  let res = await fetch(`/poll/${username}/polls/${id}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    cache: "default",
    credentials: "include",
    body: data
  });
  let ans = await res.json();
  return ans;
}

//удаление голосования
async function deletePoll(data) {
  console.log("deletePoll");
  let res = await fetch(`/poll/delete`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    cache: "default",
    credentials: "include",
    body: data
  });
  console.log("result");
  let ans = await res.json();
  return ans;
}

//получение голосований конкретного пользователя
async function userPolls(username) {
  let res = await fetch(`/poll/${username}/polls`);
  let ans = await res.json();
  return ans;
}

//удаление профиля
async function deleteUser(data) {
  let ans = await fetch(`/auth/user/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
      credentials: "include",
      body: JSON.stringify(data)
    });
  let res = await ans.json();
  return res;
}

export {
  auth,
  createPoll,
  getPolls,
  logout,
  vote,
  deletePoll,
  userPolls,
  deleteUser
};