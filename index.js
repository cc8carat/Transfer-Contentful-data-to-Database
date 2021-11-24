import { readFile } from "fs";

const parseData = (err, json) => {
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
        picture: { "en-US": image },
      },
    }) => {
      const images = image.map(({ sys: { id } }) => {
        return id;
      });

      return {
        id,
        title,
        lon,
        lat,
        marketDescription,
        city,
        country,
        duration,
        images,
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

  //markets and images are 2 array
  //each market has a images property that contains the id of image
  //Target: query single market with market id, return market's data(title, city, country...) and images'url
};

readFile("./contentful.json", "utf8", parseData);
