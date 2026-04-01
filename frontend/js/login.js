const URL = "http://127.0.0.1:3000";

function login(){
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasena").value;

  if(!email || !contrasena){
    alert("Completa todos los campos");
    return false;
  }
  fetch(URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", 
    body: JSON.stringify({
      email: email,
      contrasena: contrasena
    })
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);
    if(data.includes("correcto")){
      window.location.href = "pages/dashboard.html";
    }else{
      alert(data);
    }
  })
  .catch(err => console.error(err));
}