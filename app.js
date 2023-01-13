const express = require('express')
const app = express()
const {cartRouter} = require('./routers/cartRouter');
const{productsRouter} = require('./routers/productsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/api/cart', cartRouter);
app.use('/api/products', productsRouter);


app.get('/',(req,res) => {
    res.send('Hola mundo')
})


app.listen(8080, () => {
  console.log('Server listening on port 8080');
});