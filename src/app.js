const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const port = process.env.PORT || 3000


const app = express()

const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        number: 15151
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Roada',
        imgCommant: 'Cute ghost'
    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Home Page',
        name: 'Roada'
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
   const address = req.query.address
    geocode(address,(error,{longitude,latitude,location}={}) =>{

        console.log('latitude in app.js is ',latitude);

        if(error){
            return res.send({
                error:error
            })
        }
        forcast(longitude,latitude,(error,feedback)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send(feedback)
    //    console.log('the tempreture is ',temprature,' and if feels like ',feelslike); 
        })
        
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Roada',
        message: 'Help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Roada',
        message: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ',port);
    
})
// app.get('',(req,res)=>{
//     res.send('Hello Home')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forcast:'the weather is 15C',
//         location:'calgary, alberta'
//     })
// })

