const axios = require('axios')
const cheerio = require('cheerio')
const { admin, db } = require('../../db')
const { FIRESTORE_COLLECTIONS, FIRESTORE_DOCUMENTS } = require('../../constants')

class TyphoonAdvisory {
  constructor () {
    this.pageUrl = 'https://www.pagasa.dost.gov.ph/climate/el-nino-la-nina/monitoring'
  }

  /**
   * Get all graphics and text description from PAGASA's Typhoon Monitoring Page
   * @param {String} titleHook - Optional title text (contained in a <div>) 
   *     which is a direct sibling of target <img> & <p> elements
   * @returns {Object} data - Object containing an array of images and text description
   * @returns {String[]} data.images - Image source of the target graphic <img> files
   * @returns {String[]} data.description - Text descriptions from paragraphs <p>
   * @returns {String} data.url - PAGASA reference website URL
   * @throws {Error} Throws an error for regular scenarios or if no data are extracted
   */
  async scrapetyphooninfo (titleHook = 'Monitoring') {
    const obj = {
      images: [],
      descriptions: [],
      url: this.pageUrl
    }
  
    try {
      const { data } = await axios.get(this.pageUrl)
      const $ = cheerio.load(data)
      
      $('div').map(function () {
        const anchor = $(this)
  
        if (anchor.text().trim() === titleHook) {
          $(anchor[0].parent).find('p').map(function () {
            obj.descriptions.push($(this).text().trim())
          })
  
          $(anchor[0].parent).find('img').map(function () {
            obj.images.push($(this)[0].attribs.src)
          })        
        }
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err)
    }
  
    if (obj.images.length === 0 || obj.descriptions.length === 0) {
      throw new Error('Failed to extract data')
    }
  
    return obj
  }

  /**
   * Set (overwrite) the typhoon advisory information
   * @param {Object} data
   * @param {String} user - Generic updater username: 'admin' for all users, 'system' if cron
   */
  async settyphooninformation (data, user = 'admin') {
    try {
      const docRef = await db.collection(FIRESTORE_COLLECTIONS.SERVICES)
        .doc(FIRESTORE_DOCUMENTS.TYPHOON_ADVISORY)
        .set({
          img: data.img,
          description: data.description,
          source: data.reference,
          updated_by: user,
          date_updated: admin.firestore.Timestamp.now(),
        })
      return docRef
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = TyphoonAdvisory
