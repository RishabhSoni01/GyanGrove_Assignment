## Setup Project
```
npm clone https://github.com/RishabhSoni01/GyanGrove_Assignment.git
```
```
npm install
```
Create .env
```
DATABASE_URL=Your MongoDB URL
PORT= 5000
Weather_Code='KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg=='
Distance_Code='IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ=='
```

Starting Server
```
nodemon app.js
```

## Data Creation API:
- The endpoint / handles POST requests to create a new event.
- It expects the request body to contain details of the event, including the event name, city name, date, time, latitude, and longitude.
- It creates a new Event document using the provided data and saves it to the database.
- Finally, it responds with the created event data in JSON format with a status code of 201 (Created).
## Event Finder API:
- The endpoint /find handles GET requests to find events based on the user's latitude, longitude, and a specified date.
- It retrieves the latitude, longitude, and date from the request query parameters.
- It calculates a date range of 14 days starting from the specified date.
- It queries the database to find events occurring within the calculated date range and sorts them by date in ascending order, limiting the result to 10 events.
- For each event found, it makes asynchronous requests to external APIs to retrieve weather information and calculate the distance from the user's location.
- It constructs a response containing the event details, weather, and distance for each event found and sends it back as a JSON response.


### ScreenShots
- Data Creation API
   - ![image](https://github.com/RishabhSoni01/GyanGrove_Assignment/assets/80063042/c2a35fad-f1b8-4f37-999f-4c80ec1fa593)
     
- Event Finder API
  - ![image](https://github.com/RishabhSoni01/GyanGrove_Assignment/assets/80063042/3e72b9ef-b962-4ed6-bd74-6385d8a3eb79)
    
- CSV File Data Import API
  - ![image](https://github.com/RishabhSoni01/GyanGrove_Assignment/assets/80063042/29f813e9-b857-4a2c-8f09-45043abb084e)



