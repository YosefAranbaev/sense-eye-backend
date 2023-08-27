const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const { orgRouter } = require('./routers/orgRouter');
const { userRouter } = require('./routers/userRouter');
const { gameRouter } = require('./routers/gameRouter');
const { recRouter } = require('./routers/recRouter');
const { frameRouter } = require('./routers/frameRouter');
const { statisticsRouter } = require('./routers/statisticsRouter')
const app = express();
const port = process.env.PORT || 8000;

if (process.env.ENV === 'development') {
    const logger = require('morgan');
    app.use(logger('dev'));
}

// Set maximum payload size limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/organization', orgRouter);
app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/rec', recRouter);
app.use('/api/frames', frameRouter);
app.use('/api/statistics', statisticsRouter);


app.use('*', (req, res) => {
    res.status(404).json({ 'error': 'Page Not Found' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    process.exit(0);
});
