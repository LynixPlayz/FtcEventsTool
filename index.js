const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  var events = [
    { name: 'Event Name', date: "1999", desc: "Lorem ipsum dolor sit amet.", eventID: ""}
  ];
  if(req.query.teamnumber != null)
  {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://ftc-api.firstinspires.org/v2.0/2023/events?teamNumber=' + req.query.teamnumber,
      headers: { 
        'Authorization': 'Basic YWxleHcxMDg6NDYxN0JCOUMtRDdCOC00OEM4LUE4OEItRDcyQUJGM0QxMzZG'
      },
      maxRedirects: 0
    };

    axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data)["events"]);
      console.log(JSON.parse(JSON.stringify(response.data))["events"]);
      JSON.parse(JSON.stringify(response.data))["events"].forEach(element => {
        var eventElement = { name: "", date: "", desc: "", eventID: ""}
        console.log("iii  " + new Date(element.dateStart).toDateString());
        eventElement.date = new Date(element.dateStart).toDateString();
        eventElement.name = element.name;
        eventElement.eventID = element.eventId;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})