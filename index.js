const express = require("express");
const router = express.Router();
const app = express();

const port=8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Importar la clase Contenedor y luego instanciarla:

app.use(express.static("public"))

app.use("/api/productos",router)

app.listen(port, () => {
    console.log("Servidor en puerto 8080");
  });

const Contenedor = require('./src/contenedor');

let contenedor = new Contenedor('./src/productos.json');

router.get("/", async (req,res) =>{
    const lista = await contenedor.getAll();
    res.send(lista)
})


// GET

router.get('/:id', async (req, res) => {

    const {id} = req.params;

    const productById = await contenedor.getById(id);

  if (productById) {
      res.send(productById);
  }
  else{
      res.send("no existe un producto con esa id")
  }

});


// POST

router.post('/', async (req, res) => {

  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.send(body)
});


// DELETE

router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  const borrado = await contenedor.deleteById(id);

  if (borrado) {

    res.send({ borrado });
    
  } else {

    res.send('El producto que se intenta borrar no existe.')
  }
});


// PUT

router.put('/:id', async (req, res) => {
 
  const { body, params: {id} } = req;

  const anterior = await contenedor.getById(id);

  const nuevo = await contenedor.updateById(id, body);

  if (anterior) {

    res.send({ anterior, nuevo });

  } else {

    res.send('El producto que se intenta actualizar no existe.')
  }
});


  
