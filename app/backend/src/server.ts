import 'dotenv/config';
import app from './app';
import prisma from './api/database/prisma';

const PORT = process.env.PORT || 3009;

function serverUp() {
  try {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  } catch (error) {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  }
}

serverUp();
