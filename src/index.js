import restify from 'restify'
import mongoose from 'mongoose'
import env from 'node-env-file'

env('dist/.env')

mongoose.Promise = global.Promise;

const server = restify.createServer({
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION
})

server.pre(restify.pre.sanitizePath())

server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());
server.use(restify.bodyParser());

require('./units/api/routes')(server)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`server listening at port ${process.env.SERVER_PORT}`)

    mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DBNAME}`)
    mongoose.connection.on('open', () => {
        console.log('mongo connected');
    });
});