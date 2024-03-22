const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const axios = require('axios');
const fs = require('fs')
const dotenv=require('dotenv')

dotenv.config();
const csvParser = require('csv-parser')
router.post('/', (req, res) => {
  const newEvent = new Event(req.body);
  newEvent.save();
  res.status(201).json(newEvent);
});

// Find events based on the user's latitude, longitude and date
router.get('/find', async (req, res) => {
  const { latitude, longitude, date } = req.query;
  const parsedDate = new Date(date);
  parsedDate.setDate(parsedDate.getDate() + 14);

  const nearbyEvents = await Event.find({ date: { $gte: date } })
    .sort({ date: 1 })
    .limit(10);

  let events = [];

  for (const event of nearbyEvents) {
    const weather = await axios.get(
      `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=${process.env.Weather_Code}&city=${event.city}&date=${date}`
    );

    const distance = await axios.get(
      `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=${process.env.Distance_Code}&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`
    );

    events.push({
      ...event._doc,
      weather: weather.data,
      distance_km: distance.data,
    });
  }

  res.json(events);
});

router.post('/import', async (req, res) => {
    const filePath = './data.csv';

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', async(data)=> {
        await Event.create({
          name: data.event_name,
          city: data.city_name,
          date: new Date(data.date),
          latitude: data.latitude,
          longitude: data.longitude,
        });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        res.status(200).json({ message: 'CSV data imported successfully' });
      });
  });
  
module.exports = router;