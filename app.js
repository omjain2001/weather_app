const request = require("request");
const express = require ("express");
const path = require("path");
const yargs = require("yargs");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geoCode.js");




const app = express();
const port = process.env.PORT || 3000;

const file_path = path.join(__dirname);
const view_path = path.join(__dirname,"/templates/views");
const partial_path = path.join(__dirname,"/templates/partials");
app.use(express.static(file_path));



app.set("view engine","hbs");
app.set("views",view_path);

hbs.registerPartials(partial_path);



app.get('', (req,res) => {
    res.render("index.hbs",{
        title: "Weather",
        name: "Om Jain"
    })
})

app.get('/help', (req,res) => {

    res.render("help.hbs", {
        name: "Om Jain",
        title: "Help",
        helptext: "These are some guidelines."
    })
})


app.get('/about', (req,res) => {
    //res.send("<h2>About Page....</h2>");
    res.render("about.hbs",{
        title: "About",
        name: "Om Jain",
        about: "I am learning node.js."
    })
})

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send( {
            error: "Please enter the location... !!!"
        })
    }


    // console.log(req.query);
    geocode(req.query.address, (error,{place,latitude,longitude}={}) => { // assigning default value to the destructured object.
        
        if (error){
            // console.log(error);
            return res.send({
                error: error
            });
        }
        else {
            forecast(latitude,longitude,(forecast_error, response) => {
                if (forecast_error){
                    return res.send(forecast_error);
                }
                else{
                    res.send(response);
                }
            })
        }
    })
})

app.get('/help/*', (req,res) => {

    res.render("errors.hbs",{

        title: "404 !!",
        error: "Help service not available.",
        name: "Om Jain"
    })
})

app.get('*', (req,res) => {

    res.render("errors.hbs",{
        title: "404 !!",
        error: "Page Not Found :( !!!!!",
        name: "Om Jain"
    })
})




app.listen(port, () => {
    console.log("Listening to port " + port);
})