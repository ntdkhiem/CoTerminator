# CoTerminator
A website that increases awareness about this 2020 pandemic and helps users stay safe

### Requirements
1. Have [Docker](https://docs.docker.com/get-docker/) installed.
2. Create a Google Cloud project
3. Go to [Google Maps](https://console.cloud.google.com/google/maps-apis/overview) 
4. [Enable](https://developers.google.com/maps/gmp-get-started) Google Geocoding API in your GCP project
5. Get [API key](https://developers.google.com/maps/documentation/javascript/get-api-key) from your project

### How to run
1. Create .env.prod file
2. Add `GOOGLE_APIS_KEY={YOUR_GOOGLE_API_KEY}`
3. Run `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d`

NOTE: Make sure docker is running.

THAT'S IT!!
