const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const app = express();
let dbHandler;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'DCCN';
const collectionUserForm = 'userFormData';
const PORT = 5500;

// app.connect(PORT, function() {

    //Connects to database

    mongoClient = mongodb.MongoClient;
    mongoClient.connect(dbURL, { useUnifiedTopology: true }, (err, dbClient) => {
        if (err) {
            console.log(`There was an error connecting to the database. Error: ${err}`);
        } else {
            console.log('You are connected to the database times two!')
            dbHandler = dbClient.db(dbName);
            dbHandler.collection(collectionUserForm)
                .find({}, (error, response) =>{
                console.log (error, response)
            })
            
        };
    });



    

    null Cursor {
        _readableState: ReadableState {
          objectMode: true,
          highWaterMark: 16,
          buffer: BufferList { head: null, tail: null, length: 0 },
          length: 0,
          pipes: null,
          pipesCount: 0,
          flowing: null,
          ended: false,
          endEmitted: false,
          reading: false,
          sync: true,
          needReadable: false,
          emittedReadable: false,
          readableListening: false,
          resumeScheduled: false,
          paused: true,
          emitClose: true,
          autoDestroy: false,
          destroyed: false,
          defaultEncoding: 'utf8',
          awaitDrain: 0,
          readingMore: false,
          decoder: null,
          encoding: null
        },
        readable: true,
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        operation: FindOperation {
          options: {
            skip: 0,
            limit: 0,
            raw: undefined,
            hint: null,
            timeout: undefined,
            slaveOk: true,
            readPreference: [ReadPreference],
            db: [Db],
            promiseLibrary: [Function: Promise]
          },
          ns: MongoDBNamespace { db: 'DCCN', collection: 'userFormData' },
          cmd: {
            find: 'DCCN.userFormData',
            limit: 0,
            skip: 0,
            query: {},
            raw: undefined,
            hint: null,
            timeout: undefined,
            slaveOk: true,
            readPreference: [ReadPreference]
          },
          readPreference: ReadPreference { mode: 'primary', tags: undefined },
          cursorState: {
            cursorId: null,
            cmd: [Object],
            documents: [],
            cursorIndex: 0,
            dead: false,
            killed: false,
            init: false,
            notified: false,
            limit: 0,
            skip: 0,
            batchSize: 1000,
            currentLimit: 0,
            transforms: undefined,
            raw: undefined
          }
        },
        pool: null,
        server: null,
        disconnectHandler: undefined,
        bson: BSON {},
        ns: 'DCCN.userFormData',
        namespace: MongoDBNamespace { db: 'DCCN', collection: 'userFormData' },
        cmd: {
          find: 'DCCN.userFormData',
          limit: 0,
          skip: 0,
          query: {},
          raw: undefined,
          hint: null,
          timeout: undefined,
          slaveOk: true,
          readPreference: ReadPreference { mode: 'primary', tags: undefined }
        },
        options: {
          skip: 0,
          limit: 0,
          raw: undefined,
          hint: null,
          timeout: undefined,
          slaveOk: true,
          readPreference: ReadPreference { mode: 'primary', tags: undefined },
          db: Db {
            _events: [Object: null prototype] {},
            _eventsCount: 0,
            _maxListeners: undefined,
            s: [Object],
            serverConfig: [Getter],
            bufferMaxEntries: [Getter],
            databaseName: [Getter]
          },
          promiseLibrary: [Function: Promise]
        },
        topology: NativeTopology {
          _events: [Object: null prototype] {
            authenticated: [Function],
            error: [Array],
            timeout: [Array],
            close: [Array],
            parseError: [Array],
            fullsetup: [Array],
            all: [Array],
            reconnect: [Array],
            commandStarted: [Function],
            commandSucceeded: [Function],
            commandFailed: [Function],
            serverOpening: [Function],
            serverClosed: [Function],
            serverDescriptionChanged: [Function],
            serverHeartbeatStarted: [Function],
            serverHeartbeatSucceeded: [Function],
            serverHeartbeatFailed: [Function],
            topologyOpening: [Function],
            topologyClosed: [Function],
            topologyDescriptionChanged: [Function],
            joined: [Function],
            left: [Function],
            ping: [Function],
            ha: [Function],
            connectionPoolCreated: [Function],
            connectionPoolClosed: [Function],
            connectionCreated: [Function],
            connectionReady: [Function],
            connectionClosed: [Function],
            connectionCheckOutStarted: [Function],
            connectionCheckOutFailed: [Function],
            connectionCheckedOut: [Function],
            connectionCheckedIn: [Function],
            connectionPoolCleared: [Function],
            open: [Function]
          },
          _eventsCount: 35,
          _maxListeners: Infinity,
          s: {
            id: 0,
            options: [Object],
            seedlist: [Array],
            state: 'connected',
            description: [TopologyDescription],
            serverSelectionTimeoutMS: 30000,
            heartbeatFrequencyMS: 10000,
            minHeartbeatFrequencyMS: 500,
            Cursor: [Function: Cursor],
            bson: BSON {},
            servers: [Map],
            sessionPool: [ServerSessionPool],
            sessions: Set {},
            promiseLibrary: [Function: Promise],
            credentials: undefined,
            clusterTime: null,
            connectionTimers: Set {},
            sCapabilities: [ServerCapabilities]
          },
          [Symbol(waitQueue)]: Denque { _head: 2, _tail: 2, _capacityMask: 3, _list: [Array] }
        },
        cursorState: {
          cursorId: null,
          cmd: {
            find: 'DCCN.userFormData',
            limit: 0,
            skip: 0,
            query: {},
            raw: undefined,
            hint: null,
            timeout: undefined,
            slaveOk: true,
            readPreference: [ReadPreference]
          },
          documents: [],
          cursorIndex: 0,
          dead: false,
          killed: false,
          init: false,
          notified: false,
          limit: 0,
          skip: 0,
          batchSize: 1000,
          currentLimit: 0,
          transforms: undefined,
          raw: undefined
        },
        logger: Logger { className: 'Cursor' },
        s: {
          numberOfRetries: 5,
          tailableRetryInterval: 500,
          currentNumberOfRetries: 5,
          state: 0,
          promiseLibrary: [Function: Promise],
          explicitlyIgnoreSession: false
        }
      }
      






    module.exports = router;