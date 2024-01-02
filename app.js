const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  if (req.get('host') === 'cdn.jaxx1337.xyz' && req.originalUrl === '/') {
    return res.redirect(301, 'https://cdn.jaxx1337.xyz/jaxx.png');
  }
  next();
});

const imageDir = path.join(__dirname, "Images"); 

app.get("/", (req, res) => {
  res.send("Redirecting to -> https://cdn.jaxx1337.site/jaxx.png");
});

app.get("/jaxx.png", (req, res) => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Error reading directory");
    }

    const imageFiles = files.filter(file => {
      return file.toLowerCase().endsWith(".jpg") || file.toLowerCase().endsWith(".png");
    });

    if (imageFiles.length === 0) {
      return res.status(404).send("No images found");
    }

    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = path.join(imageDir, imageFiles[randomIndex]);

    res.sendFile(randomImage); 
  });
});

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
