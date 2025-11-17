const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT;


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);

  try {
    const urlParts = req.url.split('/');
    const firstSegment = urlParts[1] || '';
    if (firstSegment === 'admin' || firstSegment === 'api') {
      res.status(statusCode).json({ message: err.message });
    } else {
      try {
        res.status(500).render('errors/500');
      } catch (viewErr) {
        res.status(500).send('500 - Internal Server Error');
      }
    }
  } catch (handlerError) {
    res.status(statusCode).json({ message: err.message || 'Server error' });
  }
})

app.listen(port, () => {
    console.log(`Vikingo-ejs is running on port ${port}...`);
})
