const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/:id", async (req, res) => {
  try {
    const headers = {
      "TRN-Api-Key": process.env.TRACKER_API_KEY
    };

    const { id } = req.params;

    const response = await fetch(`${process.env.TRACKER_API_URL}/${id}`, {
      headers
    });

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;
