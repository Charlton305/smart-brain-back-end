import { returnClarifaiRequestOptions } from "../clarifaiData.js";

export const image = (req, res, db) => {
  const { id, url } = req.body
  const MODEL_ID = 'face-detection';
  const boundingBoxArray = []

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(url))
    .then(response => response.json())
    .then(result => {
      const regions = result.outputs[0].data.regions;

      if (regions) {
        regions.forEach(region => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          boundingBoxArray.push({ topRow, leftCol, bottomRow, rightCol });

          db("users").where('id', '=', id)
            .increment("entries", 1)
            .returning("entries")
            .then(entries => {
              res.json({
                entries: entries[0].entries,
                boundingBoxArray
              })
            })
            .catch(err => res.json({ entries: "unable to get entries", boundingBoxArray }))
        });
      } else {
        res.status(400)
      }
    })
    .catch(err => console.log(err))
}