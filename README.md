<div align="center">

# rotten-reviews

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rotten-reviews/Lobby)

Scrape audience reviews from [Rotten Tomatoes](https://www.rottentomatoes.com) 🍅

![rotten-reviews](https://media.giphy.com/media/101t9QwTM6y5oc/giphy.gif)

</div>

## Description

This Node.js package scrapes [Rotten Tomatoes](https://www.rottentomatoes.com) audience reviews pages and scrapes the contents by getting the reviewer name, date, total stars, and review excerpt.

Future features are listed on the [roadmap](#roadmap).

## Requirements

- Node.js

## Usage

### Running from binaries or global install

All binaries are compiled using [`pkg`](https://github.com/zeit/pkg) using Node.js `v8.12.0`.
See the [releases page](https://github.com/grikomsn/rotten-reviews/releases) for the binaries' download links. `rotten-reviews` can also be installed using `npm` or `yarn` globally by running:

```sh
# install using npm
npm -g i rotten-reviews

# install using yarn
yarn global add rotten-reviews
```

```console
$ rotten-reviews
Usage: rotten-reviews [options] <title>

Scrapes audience movie or tv show reviews from rotten tomatoes

Examples:
  rotten-reviews venom_2018
  rotten-reviews doctor_who/s11 --tv   (include the season # for tv shows)

Options:
  --json      exports to json
  --tv        search as a tv show (defaults to movie)
  --stars     filter reviews by star rating (1-5)
  -h, --help  output usage information
```

Here's an example for scraping two [Venom (2018)](https://www.rottentomatoes.com/m/venom_2018/reviews) reviews:

```console
$ rotten-reviews venom_2018 --max 2
Noelle C             I liked it. It wasn't horribly gruesome and the story was pretty good
3 stars.             considering the challenges of making a Spiderman villain without spiderman. I
October 17, 2018     thought Eddie was a bit too NEW YORK and San Francisco was a little too clean
                     and not filled with weirdos to be realistic, but if I think of it like a
                     cartoon, it was perfect.


                     -
Chris S              Saw this last night, and enjoyed it very much. Not sure why the critics loathe
4 stars.             it so bad. It's an anti-hero movie. The interaction between Venom and Brock is
October 17, 2018     hilarious. Tom Hardy plays the broken man very well. There were several moments
                     where the jokes had the entire theater laugh at the same time. The action and
                     pacing of the movie are good. Professional critics are too full of themselves.
                     They expect an action flick to be Oscar level, when literally nobody else does.


                     -
Jeremy C             The critics were too hard on the film, very much worth going to see. My dad and
5 stars.             I loved it.
October 17, 2018

                     -
```

### Running from package

- Install package by running:

  ```sh
  # install using npm
  npm i rotten-reviews

  # install using yarn
  yarn add rotten-reviews
  ```

- Example usage source code:

  ```js
  // import the package
  const RottenReviews = require('rotten-reviews')

  // https://www.rottentomatoes.com/m/venom_2018
  //                                  ^^^^^^^^^^
  const movieSlug = 'venom_2018'

  // obtain 3 audience reviews
  const reviewCount = 3

  // determines whether is a tv show or not,
  // optional and defaults to false
  const isTV = false

  // scrapes the review pages and returns via promise
  RottenReviews.getAudienceReviews(movieSlug, reviewCount, isTV).then(
    reviews => {
      console.log(JSON.stringify(reviews, null, 3))
    }
  )
  ```

You can view more examples by opening the [examples folder](/examples).

## Roadmap

### [Version 1.1.0](https://github.com/grikomsn/rotten-reviews/milestone/1)

- [x] Scrape defined number of reviews instead of pages ([#6](https://github.com/grikomsn/rotten-reviews/pull/6))
- [x] Error handling if movie page doesn't exist ([#2](https://github.com/grikomsn/rotten-reviews/pull/2))
- [x] Include scraping TV series reviews ([#8](https://github.com/grikomsn/rotten-reviews/pull/8))

## Credits

- [`axios`](https://github.com/axios/axios) for fetching webpages
- [`cheerio`](https://github.com/cheeriojs/cheerio) for scraping the webpage contents
- [`commander.js`](https://github.com/tj/commander.js) for running this package as a CLI app
- [`columnify`](https://github.com/timoxley/columnify) for prettifying the CLI output
- [`pkg`](https://github.com/zeit/pkg) for compiling to binaries

## License

MIT
