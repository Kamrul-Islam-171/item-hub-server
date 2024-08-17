

const express = require('express')
const cors = require('cors');
const app = express()

const port = process.env.PORT || 5000;
require('dotenv').config()
var jwt = require('jsonwebtoken');




app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,

}))



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.insvee7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyToken = (req, res, next) => {
  // console.log('inside = ', req.headers.authorization);
  if (!req.headers.authorization) {


    return res.status(401).send({ message: 'Forbidden-Access' })
  }
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {

      return res.status(401).send({ message: 'Forbidden-Access' });
    }
    req.decoded = decoded;

    next();
  });

}



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const userCollection = client.db('Item-Hub').collection('users');
    const productCollection = client.db('Item-Hub').collection('products');



    app.post('/jwt', async (req, res) => {
      const user = req.body;
      //   console.log(user)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
      res.send({ token })
    })



    app.put('/user', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const query = { email: user?.email };
      const findUser = await userCollection.findOne(query);
      if (findUser) {
        const option = {
          $set: {
            ...user
          }
        }
        await userCollection.updateOne(query, option);
        return;
      }
      // console.log(user)
      const result = await userCollection.insertOne(user);
      res.send(result);
    })


    app.put('/username-image-update', async (req, res) => {
      const user = req.body;
      // console.log(user)
      const query = { email: user?.email };
      const doc = {
        $set: {
          ...user
        }
      }
      const result = await userCollection.updateOne(query, doc);
      res.send(result);
    })

    app.get('/products', async (req, res) => {
      let { page = 1, limit = 10, search, sorting, brand, category, min, max } = req.query;
      // const query = {};
      min = parseInt(min);
      max = parseInt(max);
      // console.log('from original  = ', min, max);
      const skip = (page - 1) * limit;
      const query = {};
      let option = {};
      if (search) {
        query.name = new RegExp(search, 'i');
      }
      if (brand) {
        query.brand = new RegExp(brand, 'i');
      }
      if (category) {
        query.category = new RegExp(category, 'i');
      }
      // query.price = {$gte : min, $lte : max};
      query.price = {};
      if (min) {
        query.price.$gte = Number(min); // Minimum price filter
      }
      if (max) {
        query.price.$lte = Number(max); // Maximum price filter
      }
      if (sorting) {
        if (sorting == 'newest') {
          option = {
            sort: {
              'index': -1,

            }
          }
        }
        else {
          option = {
            sort: {
              price: sorting == 'low' ? 1 : -1
            }
          }
        }
      }
      const products = await productCollection.find(query, option).skip(Number(skip)).limit(Number(limit)).toArray();
      res.send(products);
    })

    app.get('/docCount', async (req, res) => {
      let { search, brand, category, min, max } = req.query;
      // console.log(min, max);
      min = parseInt(min);
      max = parseInt(max);
      const query = {};
      if (search) {
        query.name = new RegExp(search, 'i');
      }
      if (brand) {
        query.brand = new RegExp(brand, 'i');
      }
      if (category) {
        query.category = new RegExp(category, 'i');
      }
      query.price = {};
      if (min) {
        query.price.$gte = Number(min); // Minimum price filter
      }
      if (max) {
        query.price.$lte = Number(max); // Maximum price filter
      }
      const countDoc = await productCollection.find(query).toArray();
      // console.log(countDoc)
      res.send(countDoc);
    })






    //get-user-info
    app.get('/get-user-info/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result)
    })






    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Item-Hub-is-running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})