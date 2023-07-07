const express = require("express");
const router = express.Router();
// const port = 3000;

// Define your data (dummy data for demonstration purposes)
const allItems = generateDummyData(10000);

// Endpoint to fetch paginated data
router.get("/scroll", (req, res) => {
  console.log(req.body.page);
  console.log(req.params);
  const page = parseInt(req.body.page) || 1;
  const pageSize = parseInt(req.body.pageSize) || 10;

  // Calculate the range of items to send based on the page and page size
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the subset of items for the requested page
  const pageItems = allItems.slice(startIndex, endIndex);

  // Simulate a delay to mimic an actual API call
  setTimeout(() => {
    res.status(200).json({
      data: pageItems,
      page,
      pageSize,
      totalItems: allItems.length,
    });
  }, 500);
});

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// Dummy function to generate sample data
function generateDummyData(count) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({ Id: i, url: "", Name: i });
  }
  return data;
}
module.exports = router;
