const fs = require('fs')
const path = require('path')
const { scrapetyphooninfo } = require('../classes/typhoonadvisory')

const main = async () => {
  let data
  let successCount = 0

  try {
    // Scrape data
    data = await scrapetyphooninfo()
    successCount += 1
    console.log('Scrapping success.')
  } catch (err) {
    console.log(`[ERROR]: ${err.message}`)
  }

  if (data) {
    console.log(data)

    // Write data to a JSON file
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Scraped data is written to ${path.resolve(__dirname, '..', '..',  'data.json')}`)
      }
    })
  }
}

main()
