function trylogin() {

  let username = document.getElementById("nickname").value;

  fetch("/api/trylogin", {
    mode: "cors",
    method: "post",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(username)
  })
}