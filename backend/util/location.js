const axios = require("axios");

const HttpError = require("../models/http-error");
const APIKEY = "8fc0f588ba332635d88aff8bf9a20fa1";
async function getCoordsForAddress(address) {
  const response = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${APIKEY}&query=${address}`
  );
  const data = await response.data;
  // console.log(data);
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  const coordinates = {
    latitude: data.data[0].latitude,
    longitude: data.data[0].longitude,
  };
  // console.log(coordinates, "This Are Co-ordinates");
  return coordinates;
}

module.exports = getCoordsForAddress;
