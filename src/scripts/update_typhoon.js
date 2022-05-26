const { scrapetyphooninfo, settyphooninformation } = require('../classes/typhoonadvisory')

const main = async () => {
  let data
  let successCount = 0

  try {
    data = await scrapetyphooninfo()
    successCount += 1
    console.log('Scrapping success.')
  } catch (err) {
    console.log(`[ERROR]: ${err.message}`)
  }

  if (data) {
    const obj = {
      img: data.images[0],
      description: data.descriptions.join(' '),
      reference: data.url,
      updated_by: 'system'
    }
  
    try {
      await settyphooninformation(obj)
      successCount += 1
      console.log('Firestore update success.')
    } catch (err) {
      console.log(`[ERROR]: ${err.message}`)
    }
  }

  successCount = 0

  if (successCount !== 2) {
    // TO-DO: Send email notification
    const errMsg = 'Something went wrong.'
    throw new Error(errMsg)
  }
}

main()
