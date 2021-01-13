function getStaff() {
  fetch("/api/staff", {
    mode: "cors"
  })
  .then((data) => {
      return data.json();
  })
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].primary_group != "default" && res[i].primary_group.includes("staff_")) {
        let group = res[i].primary_group.split("staff_")[1];
        let username = res[i].username;
        let uuid = res[i].uuid;

        let card = document.createElement("div");

        let name = document.createElement("p");
        name.innerText = username;

        let image = document.createElement("img");
        image.src = "https://www.mc-heads.net/head/"+username;

        card.appendChild(image);
        card.appendChild(name);

        document.getElementById(group).appendChild(card);

        console.log(res[i]);
      }
    }

  });
}