const mysql = require("mysql2");

const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "bd_mezcladitas"
})

bd.connect(err => {
    if (err){
        console.log("Error de conexión: ", err)
    }else{ 
        console.log("Conexión Exitosa")
    }
})

module.exports = bd