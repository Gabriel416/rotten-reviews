const Axios = require('axios').default
const cheerio = require('cheerio')

module.exports = {
  getAudienceReviews: (slug, pages, stars) => {
    const movieUrl = (slug, pages) =>
      `https://www.rottentomatoes.com/m/${slug}/reviews/?page=${pages}&type=user&sort=`

    return new Promise(resolve => {
      const pageRequests = []
      for (let i = 0; i < pages; i++) {
        pageRequests.push(Axios.get(movieUrl(slug, i + 1)))
      }
      resolve(pageRequests)
    })
      .then(pageRequests => Axios.all(pageRequests))
      .then(
        Axios.spread((...requests) => {
          const reviews = []
          requests.forEach(request => {
            reviews.push.apply(reviews, module.exports.scrapePage(request.data, stars.toString()))
          })
          return reviews
        })
      )
  },
  scrapePage: (data, starsToFilter) => {
    const $ = cheerio.load(data)
    const reviews = []

    $('.review_table_row').each((i, element) => {
      let stars = $(element).find('.glyphicon.glyphicon-star').length
      const hasHalf = $(element).find('span:contains("½")').length ? 0.5 : 0

      stars += hasHalf;

      if (starsToFilter && stars != starsToFilter) {
        return;
      };

      const [reviewer, date, review] = [
        '.bold.unstyled.articleLink',
        '.fr.small.subtle',
        '.user_review',
      ].map(classes =>
        $(element)
          .find(classes)
          .text()
          .trim()
      )

      reviews.push({
        reviewer,
        date,
        stars,
        review,
      })
    })

    return reviews
  },
}
