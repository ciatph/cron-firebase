## cron-firebase

Testing updating a Firestore collection using a CRON job running on github actions.

### Requirements

1. NodeJS v14.18.3
2. Firebase Project [[link]](https://firebase.google.com/)

## Installation

1. Clone this repository.  
`git clone https://github.com/ciatph/cron-firebase.git`

2. Install dependencies.  
`npm install`

3. Create the environment variables. Create a `.env` file inside the **/server** directory with reference to the `.env.example` file. Encode your own Firebase project settings on the following variables:
   -  `FIREBASE_SERVICE_ACC`
      -  A Firebase project's private key file contents, condensed into one line and minus all whitespace characters.
      -  The service account JSON file is generated from the Firebase project's **Project Settings** page, on  
        **Project Settings** -> **Service accounts** -> **Generate new private key**
   - `FIREBASE_PRIVATE_KEY`
      - The `private_key` entry from the service account JSON file
      - > **NOTE:** Take note to make sure that the value starts and ends with a double-quote on WINDOWS OS localhost. Some systems may or may not require the double-quotes (i.e., Ubuntu running on heroku).

## Usage

1. Run any of the aavailable `npm scripts` on **Available Scripts**.

## Available Scripts

### `npm start`

Scrape data from a sample website and upload scraped data to a Firestore collection.

### `npm run scrape`

Scrape data from a sample website and write scraped data to a JSON file `data.json`.

@ciatph  
20220626
