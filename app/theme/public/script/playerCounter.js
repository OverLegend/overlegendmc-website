function countPlayers(a,b,c) {
    fetch("https://ptb.discord.com/api/guilds/706103159835197460/widget.json", {
      mode: "cors"
    })
    .then((data) => {
        return data.json();
    })
    .then((res) => {
      document.querySelector(a).innerText = res.members.length;
    });




    fetch("https://mcapi.us/server/status?ip=mc.overlegend.it&port=25575", {
      mode: "cors"
    })
    .then((data) => {
        return data.json();
    })
    .then((res) => {
      if (res.online == true) {
        document.querySelector(b).innerHTML = res.players.now;
      } else {
        document.querySelector(b).innerText = "Offline";
      }
    });


    document.querySelector(c).innerText = "1500+";
    // fetch("https://www.instagram.com/overlegend_network/?__a=1", {
    //   mode: "cors"
    // })
    // .then((data) => {
    //     return data.json();
    // })
    // .then((res) => {
    //   console.log(res);
    //   document.querySelector(c).innerText = res.graphql.user.edge_followed_by.count;
    // });
}