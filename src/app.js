const path = require('path');
const express = require('express');
const hbs = require('hbs'); 
const { query } = require('express');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Thaniv Reddy'
    });
    });



app.get('/help', (req,res)=>{
res.render('help',{
    title:'Help',
    name:'Thanvi G'
})
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About',
        name:'Thanvi G'
    });
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'enter address'
        });
    }
    var address =req.query.address
    geocode(address,(error,{latitude,longitude, address}={})=>{
        if(error){
            return res.send({'error':error});
        }
        forecast(latitude, longitude,(error, forecastData) => {
            if(error){
               return req.send({'error':error});
            }
            res.send({
                forecast:forecastData,
                location:address
            })
        })
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'enter search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('help-error');
 })
app.get('*',(req,res)=>{
   res.render('error');
})

app.listen(port,()=>{
    console.log('Server is up on' +port);
})