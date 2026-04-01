const express = require("express");
const cors = require('cors')
const bd = require('./bd/bd')
const app = express()
const session = require('express-session')
const bcrypt = require('bcrypt')

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
app.use(express.json())
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        domain: '127.0.0.1'
    }
}))

app.listen(3000, ()=> {console.log("Proyecto final: http://localhost:3000")})

// CRUD inventario
app.post('/inventario', (req, res)  =>{
    const {categoria, nombre, marca, descripcion, precio, existencia} = req.body;
    const sql ='INSERT INTO inventario (categoria, nombre, marca, descripcion, precio, existencia) VALUES (?,?,?,?,?,?)';
    bd.query(sql, [categoria, nombre, marca, descripcion, precio, existencia], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send("Producto Agregado")
    })
})

app.get('/inventario', (req, res)=>{
    const sql = 'SELECT * FROM inventario'
    bd.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.json(results)
    })
})

app.get('/inventario/:id', (req, res)=>{
    const sql = 'SELECT * FROM inventario WHERE id =?'
    const {id} = req.params;
    bd.query(sql,[id], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.json(results[0])
    })
})

app.put('/inventario/:id', (req, res)=> {
    const {categoria, nombre, marca, descripcion, precio, existencia} = req.body;
    const {id} = req.params;
    const sql = 'UPDATE inventario SET categoria =?, nombre =?, marca=?, descripcion=?, precio=?, existencia=? WHERE id =? '
    bd.query(sql,[categoria, nombre, marca, descripcion, precio, existencia, id], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        if(results.affectedRows===0){
            return res.send('Producto no encontrado')
        }
        res.send('Producto actualizado ')

    })
})

app.delete('/inventario/:id', (req, res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM inventario WHERE id =?';
    bd.query(sql, [id], (err, results)=>{
        if(err){
            if(err.errno === 1451){
                return res.status(400).send('No se puede eliminar el producto porque tiene ventas registradas');
            }
            return res.status(500).send(err)
        }
        if(results.affectedRows===0){
            return res.send('Producto no encontrado')
        }
        res.send('Producto Eliminado')
    })
})

// CRUD ventas
app.post('/ventas', (req, res)=>{
    const {id_usuario, id_producto, nombre, categoria, unidades_vendidas, total, fecha} =req.body;
    const sql = 'INSERT INTO ventas (id_usuario, id_producto, nombre, categoria, unidades_vendidas, total, fecha) VALUES (?,?,?,?,?,?,?)';
    bd.query(sql, [id_usuario, id_producto, nombre, categoria, unidades_vendidas, total, fecha], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send('Venta agregada ')
    })
})

app.get('/ventas', (req,res)=>{
    const sql = 'SELECT * FROM ventas'
    bd.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.json(results)
    })
})

app.get('/ventas/:id', (req, res)=>{
    const sql = 'SELECT * FROM ventas WHERE id =?'
    const {id} = req.params;
    bd.query(sql,[id], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.json(results[0])
    })
})

app.put('/ventas/:id', (req, res)=>{
    const {unidades_vendidas, total}= req.body;
    const {id} = req.params;
    const sql = 'UPDATE ventas SET  unidades_vendidas=?,total =?, fecha = NOW() WHERE id=? ';
    bd.query(sql, [unidades_vendidas, total, id], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        if(results.affectedRows===0){
            return res.send('Venta no encontrada')
        }
        res.send('Venta actualizada ')
    })
})

app.delete('/ventas/:id', (req, res)=>{
    const {id}= req.params;
    const sql ='DELETE FROM ventas WHERE id =?';
    bd.query(sql, [id], (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        if (results.affectedRows===0){
            return res.send('Venta no encontrada')
        }
        res.send('Venta eliminada')
    })
})

// Usuarios
app.post('/sesion', async(req,res)=>{
    try{
        const {nombre, apellidos, email, contrasena}=req.body;
        const contrasenaOculta = await bcrypt.hash(contrasena, 10);
        const sql = 'INSERT INTO sesion (nombre, apellidos, email, contrasena) VALUES (?,?,?,?)';

        bd.query(sql, [nombre, apellidos, email, contrasenaOculta], (err)=>{
            if (err){
                return res.status(500).send(err)
            }
            res.send('Usuario creado')
        })
    } catch (error){
        res.status(500).send(error);
    }
})

app.post('/login', (req, res)=>{
    const {email, contrasena} = req.body;
    const sql = 'SELECT * FROM sesion WHERE email =?';

    bd.query(sql, [email], async (err, results)=>{
        if (results.length===0){
            return res.status(401).send('Usuario no encontrado')
        }
        const usuario = results[0];
        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (match){
            req.session.usuario={
                id: usuario.id,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos
            }
            res.send('Login correcto')
        }else{
            res.status(401).send('Contraseña Incorrecta')
        }
    })
})

app.get('/perfil', (req, res)=>{
    if(!req.session.usuario){
        return res.status(401).send('No autorizado')
    }
    res.json(req.session.usuario)
})

app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.send('Sesion cerrada bai')
})