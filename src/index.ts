import {app} from './app';

const port = process.env.PORT;

app.listen(port, () => console.log(`Goals service listening on port: ${port}`))