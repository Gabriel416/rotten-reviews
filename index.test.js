const nock = require('nock')
const RottenReviews = require('.')

const baseURL = 'https://www.rottentomatoes.com'

describe('[RottenReviews]',  () => {
  describe('Get audiences reviews',  () => {

    it('should exists the method "getAudienceReviews"',  () => {
      expect(typeof RottenReviews.getAudienceReviews).toBe('function')
    })

    it('should return the reviews when I try to get audiences reviews of a existing movie', () => {
      const want = {
        "date": "October 12, 2018",
        "review": "Very cool plot twist at the end, enjoyable movie.",
        "reviewer": "Daniel M",
        "stars": 4
      }
      expect.assertions(1)

      return RottenReviews.getAudienceReviews('venom_2018', 21)
        .then(reviews => expect(reviews[0]).toEqual(want))
    })

    it('should recognize half stars rating', () => {
      const want = {
        "date": "October 1, 2018",
        "review": "Uncomfortable length and unrewarding end.",
        "reviewer": "Ines P",
        "stars": 2.5
      }
      expect.assertions(1)

      return RottenReviews.getAudienceReviews('venom_2018', 2)
        .then(reviews => expect(reviews[1]).toEqual(want))
    })

    it('should return the reviews when I try to get audiences reviews of a existing tv show', () => {
      const want = {
        "date": "October 12, 2018",
        "review": "Very cool plot twist at the end, enjoyable movie.",
        "reviewer": "Daniel M",
        "stars": 4
      }
      expect.assertions(1)

      return RottenReviews.getAudienceReviews('doctor_who/s11', 1, true)
        .then(reviews => expect(reviews[0]).toEqual(want))
    })

    it('should throw an error if there is no movie', () => {
      const want = 'Request failed with status code 404'
      expect.assertions(1)

      return RottenReviews.getAudienceReviews('non_existent_movie', 1)
        .catch(error => expect(error.message).toEqual(want))
    })

  })
})

/* Nock config */
nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get(`/m/venom_2018/reviews/`)
  .query({
    page: 1,
    type: 'user'
  })
  .reply(200,
    `<html>
      <span class="pageInfo">Page 1 of 2</span>

      <div class="review_table">
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Daniel M</a>
          <span class="fr small subtle">October 12, 2018</span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <div class="user_review">Very cool plot twist at the end, enjoyable movie.</div>
        </div>

        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Ines P</a>
          <span class="fr small subtle">October 1, 2018</span>
          <span>
            <span class="glyphicon glyphicon-star"></span>
            <span class="glyphicon glyphicon-star"></span>
            ½
          </span>
          <div class="user_review">Uncomfortable length and unrewarding end.</div>
        </div>
      </div>
    </html>`)

nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get('/m/venom_2018/reviews/')
  .query({
    page: 2,
    type: 'user'
  })
  .reply(200,
    `<html>
      <span class="pageInfo">Page 2 of 2</span>
    </html>`)

nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get(`/tv/doctor_who/s11/reviews/`)
  .query({
    page: 1,
    type: 'user'
  })
  .reply(200,
    `<html>
      <span class="pageInfo">Page 1 of 1</span>

      <div class="review_table">
        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Daniel M</a>
          <span class="fr small subtle">October 12, 2018</span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <span class="glyphicon glyphicon-star"></span>
          <div class="user_review">Very cool plot twist at the end, enjoyable movie.</div>
        </div>

        <div class="row review_table_row">
          <a class="bold unstyled articleLink">Ines P</a>
          <span class="fr small subtle">October 1, 2018</span>
          <span>
            <span class="glyphicon glyphicon-star"></span>
            <span class="glyphicon glyphicon-star"></span>
            ½
          </span>
          <div class="user_review">Uncomfortable length and unrewarding end.</div>
        </div>
      </div>
    </html>`)

nock(baseURL)
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get(`/m/non_existent_movie/reviews/`)
  .query({
    page: 1,
    type: 'user'
  })
  .reply(404, {
    status: 404
  })
