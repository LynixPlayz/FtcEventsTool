const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000
const axios = require('axios');


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  var events = [];
  if(req.query.teamnumber != null)
  {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ftc-api.firstinspires.org/v2.0/2023/events?teamNumber=' + req.query.teamnumber,
      headers: { 
        'Authorization': 'Basic ' + process.env.TOKEN
      },
      maxRedirects: 0
    };

    axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data)["events"]);
      console.log(JSON.parse(JSON.stringify(response.data))["events"]);
      JSON.parse(JSON.stringify(response.data))["events"].forEach(element => {
        var eventElement = { name: "", date: "", desc: "", eventID: "", teamNumber: ""}
        console.log("iii  " + new Date(element.dateStart).toDateString());
        eventElement.date = new Date(element.dateStart).toDateString();
        eventElement.name = element.name;
        eventElement.eventID = element.code;
        eventElement.teamNumber = req.query.teamnumber;
        console.log(eventElement);
        events.push(eventElement);
      });
      res.render('dist/index', {
        events: events
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
  else{
    res.render('dist/index', {
      events: events
    })
  }
  
  
  

  
})

app.get("/scheduleviewer", (req, res) => {
  var matches = [];
  if(req.query.eventId != null && req.query.teamnumber != null)
  {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ftc-api.firstinspires.org/v2.0/2023/schedule/' + req.query.eventId + '/?teamNumber=' + req.query.teamnumber,
      headers: { 
        'Authorization': 'Basic ' + process.env.TOKEN
      },
      maxRedirects: 0
    };
    
    axios.request(config)
    .then((response) => {
      JSON.parse(JSON.stringify(response.data))["schedule"].forEach(element => {
        var matchElement = { matchNumber: '1', field: "2", station: "Blue2", displayTeamNumber: "24660"}
        matchElement.matchNumber = element.matchNumber;
        matchElement.field = element.field;
        element.teams.forEach(team => {
          if(team.teamNumber == req.query.teamnumber)
          {
            matchElement.displayTeamNumber = team.displayTeamNumber;
            matchElement.station = team.station;
          }
        })
        console.log(matchElement);
        matches.push(matchElement);
      });
      res.render('dist/schedule', {
        matches: matches
      })
    })
    .catch((error) => {
      console.log(error);
    });    
  }
  else{
    res.render('dist/schedule', {
      matches: matches
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})