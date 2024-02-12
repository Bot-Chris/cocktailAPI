const app = require('./index.js'); // Adjust the path to your main app file

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
