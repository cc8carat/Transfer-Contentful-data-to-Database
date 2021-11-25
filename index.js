import { readFile } from "fs";
import db from "./pg.js";

const connectDatabase = (err, json) => {
  if (err) {
    console.log(err);
  }
  const { entries, assets } = JSON.parse(json);
  //Create markets array including each market object
  const markets = entries.map(
    ({
      sys: { id },
      fields: {
        title: { "en-US": title },
        location: {
          "en-US": { lon, lat },
        },
        marketDescription: { "en-US": marketDescription },
        city: { "en-US": city },
        country: { "en-US": country },
        date: { "en-US": duration },
        picture: {
          "en-US": [
            {
              sys: { id: imageID },
            },
          ],
        },
      },
    }) => {
      return {
        id,
        title,
        lon,
        lat,
        marketDescription,
        city,
        country,
        duration,
        imageID,
      };
    }
  );

  //Create images array including image url

  const images = assets.map(
    ({
      sys: { id },
      fields: {
        file: {
          "en-US": { url },
        },
      },
    }) => {
      return { id, url };
    }
  );

  // Add matched url to market
  markets.forEach((market) => {
    const matchImage = images.find(({ id }) => {
      return market.imageID === id;
    });
    market.imageUrl = matchImage.url;
  });

  //Import markets into database

  // markets.forEach(
  //   ({
  //     id,
  //     title,
  //     lon,
  //     lat,
  //     marketDescription,
  //     city,
  //     country,
  //     duration,
  //     imageID,
  //     imageUrl,
  //   }) => {
  //     db.query(
  //       `INSERT INTO Post(id, title, lon, lat, imageUrl, marketDescription, country, city, duration, imageID) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
  //       [
  //         id,
  //         title,
  //         lon,
  //         lat,
  //         imageUrl,
  //         marketDescription,
  //         country,
  //         city,
  //         duration,
  //         imageID,
  //       ]
  //     );
  //   }
  // );

  const market1 = markets[0];
  // db.query(
  //   `INSERT INTO post(id, title, lon, lat, "imageUrl", "marketDescription", country, city, duration, "imageID") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
  //   [
  //     market1.id,
  //     market1.title,
  //     market1.lon,
  //     market1.lat,
  //     market1.imageUrl,
  //     market1.marketDescription,
  //     market1.country,
  //     market1.city,
  //     market1.duration,
  //     market1.imageID,
  //   ]
  // );
  //console.log(market1);
  // db.query(
  //   `UPDATE post SET "marketDescription" = $1 WHERE id = '${market1.id}';`,
  //   [market1.marketDescription]
  // );
  //console.log(market1);

  // console.log(markets);
};

//readFile("./contentful.json", "utf8", connectDatabase);

// db.query(
//   `INSERT INTO users (first_name, last_name, age) VALUES($1, $2, $3) RETURNING *;`,
//   ["test3", "test3", 3]
// );

const { result } = db.query(`SELECT * FROM post;`);
console.log(result);
