import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {"":''} // update doc
const outputFile = './swagger-output.json';
const endpointsFiles = [path.join(__dirname, './index.ts'),path.join(__dirname, './routes/Login/index.ts'),path.join(__dirname, './routes/Transactions/index.ts'), path.join(__dirname, './routes/Users/index.ts')];
swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles).then(async () => {
    await import('./index');
});