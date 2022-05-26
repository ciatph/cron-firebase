const { scrapetyphooninfo, settyphooninformation } = require('../classes/typhoonadvisory')

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
    try {
      // Upload scrated data to Firestore
      await settyphooninformation({
        img: data.images[0],
        description: data.descriptions.join(' '),
        reference: data.url,
        updated_by: 'system'
      })
      successCount += 1
      console.log('Firestore update success.')
      console.log(JSON.stringify(data))
    } catch (err) {
      console.log(`[ERROR]: ${err.message}`)
    }
  }

  if (successCount !== 2) {
    // TO-DO: Send email notification
    const errMsg = '[ERROR]: Something went wrong.'
    console.log(errMsg)
    throw new Error(errMsg)
  }
}

main()
