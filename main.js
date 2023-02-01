const express = require('express');

const logger = require('./middlewares/logger.middleware');
const usersRouter = require('./routes/users/users.router');
const authRouter= require("./routes/auth/auth.router");

const errorHandlerMiddleware = require("./middlewares/error-handler.middleware");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(logger);

app.use('/users', usersRouter);
app.use('/users', authRouter);

app.use(errorHandlerMiddleware);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
