const { scrapetyphooninfo, settyphooninformation } = require('../classes/typhoonadvisory')

const main = async () => {
  let data
  let error = false

  try {
    data = await scrapetyphooninfo()
    console.log('Scrapping success.')
  } catch (err) {
    console.log(err.message)
    error = true
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
      console.log('Firestore update done')
    } catch (err) {
      console.log(err.message)
      error = true
    }
  }

  if (error) {
    // TO-DO: Send email notification
  }
}

main()
