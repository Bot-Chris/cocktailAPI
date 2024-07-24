const app = require('./index.js'); // Adjust the path to your main app file

const port = process.env.PORT || 80;
app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
