import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/user', (req, res) => {
  res.send({ message: 'Welcome to user!' });
});

const port = process.env.PORT || 5555;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/user`);
});
server.on('error', console.error);
