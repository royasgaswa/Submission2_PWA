let base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/PL/teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          let articlesHTML = "";
          data.teams.forEach(function (team) {
            articlesHTML += `
            <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
            <a href="./article.html?id=${team.id}">
              <div class="col s6">
                <img src="${team.crestUrl}" alt="" class="circle" id="logoteam"> <!-- notice the "circle" class -->
              </div>
              </a>
              <div class="col s10">
                <span class="black-text">
                ${team.name}
                </span>
              </div>
            </div>
          </div>
            
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        })
      }
    })
  }
  fetch(base_url + "competitions/PL/teams", {
    headers: {
      "X-Auth-Token": "f98980412d184efe82ed05170921293d"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.teams.forEach(function (team) {
        articlesHTML += `
            <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row valign-wrapper">
            <a href="./article.html?id=${team.id}">
              <div class="col s12">
                <img src="${team.crestUrl}" alt="" class="circle" id="logoteam"> <!-- notice the "circle" class -->
              </div>
              </a>
              <div class="col s10">
                <span class="black-text">
                ${team.name}
                </span>
              </div>
            </div>
          </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
      console.log(data.teams);
    })
    .catch(error);
}
function getTeamsById() {
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          var articleHTML = `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    ${data.address}
                  </div>
                </div>
              `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        });
      }
    });
  }



  fetch(base_url + "teams/" + idParam, {
    headers: {
      "X-Auth-Token": "f98980412d184efe82ed05170921293d"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let articleHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            ${data.address}
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
    });
}
export { getTeams, getTeamsById };