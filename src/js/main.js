import { getTeams} from "./api.js";

// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/src/service-worker.js')
      .then(function() {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function(){
        console.log('Pendaftaran ServiceWorker gagal');
      });
    })
  } else {
    console.log("ServiceWorker belum didukung browser ini.")
}
 // REQUEST API UNTUK PERTAMA KALI
 document.addEventListener("DOMContentLoaded",function(){
  getTeams();
});