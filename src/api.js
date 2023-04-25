import {comprobarRepositorios} from '../prueba-intro.js'
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import {repos} from '../repos.js';
import serverless from "serverless-http"

const app = express();
const router = express.Router(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


router.get('/', (req, res) => {
  res.send('Hola mundo!');
});

router.get('/existenRepos', async (req, res) => {
    try {
      console.log("repos", repos)
      const resultado = await comprobarRepositorios(repos);
      console.log("res",resultado)
      res.json(resultado);
    } catch (error) {
      // console.log(error);
      res.status(500).send('Hubo un error al procesar la solicitud.');
    }
  });

  
  router.post('/envioDatos', (req, res) => {
    try{
      let respuesta = req.body.datos
      respuesta.map(item => repos.push(item))
      console.log("repos",repos)
      res.send("ok")
    }catch (error){
      console.log(error);
      res.status(500).send('Hubo un error al procesar la solicitud.');
    }
  })


app.use('/.netlify/functions/api', router);
export const handler = serverless(app);