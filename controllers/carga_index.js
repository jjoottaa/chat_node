const getUsuarios = (req, res)=>{
    const usuarios = [{
        usuario:"Administrador" , id:"1"
    },{
        usuario:"Usuario" , id:"2"
    }]
    return res.json(usuarios);
} 

module.exports = { getUsuarios};
