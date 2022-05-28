const { fetchdata } = require('../classes/typhoonadvisory')

const main = async () => {
  try {
    const res = await fetchdata()
    console.log('---Done fetching')
    console.log(res.data())
  } catch (err) {
    throw new Error(err.message)
  }
}

main()
