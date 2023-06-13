// const fs = require('fs');
// const path = require('path');

// fs.rename(image.tempPath, path.join(__dirname, './images/' + image.name), err => {
//   if (err) return res.status(500).send(err);

//   res.send('File uploaded!');
// });

// fs.copyFile(image.tempPath, path.join(__dirname, './images/' + image.name), err => {
//   if (err) return res.status(500).send(err);

//   // send a success response
//   res.send('File uploaded!');
// });