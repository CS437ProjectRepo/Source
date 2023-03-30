const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require('supertest')
const app = require('../src/app')
const mongoose = require("mongoose");
const User = mongoose.model("User");
const {connectToDatabase, dropCollections,disconnectFromDatabase} = require('../config/mongoDbConfig')
const {HTTP_STATUS_CODES,MESSAGES,ROUTES} = require('../utils/server.constants')

let mongoServer;
const validEmail        = "test@bu.edu"
const validPassword     = "Team2RepoProject@"

describe("Test user controller file", ()=> {
    beforeAll(async ()=> {
        mongoServer = await MongoMemoryServer.create()
        let mongoUri = mongoServer.getUri();
        //create the database using the in memory server
        await connectToDatabase(mongoUri)
    })
    
    beforeEach(async ()=> {
        const newUser = User ({
            email       : validEmail,
            password    : validPassword
        })
        await newUser.save();
    })
  
    afterEach(async ()=>{
        await dropCollections();
    })

    afterAll(async ()=> {
        await disconnectFromDatabase()
        await mongoServer.stop()
    })


    describe("POST/login", () => {
        test("Returns an error if the password field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email: validEmail});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.error).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns an error if the email field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({password: validPassword});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.error).toBe(MESSAGES.FIELDS_MISSING);
        });
        
        test("Returns message if the incorrect email format it used.", async () => {
            const response = await request(app)
            .post(ROUTES.USER_LOGIN)
            .send({ email: "invalidEmail@ blah blah.com", password: validPassword });
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS);
        });
        
        test("Returns message if the incorrect password format it used.", async () => {
            const response = await request(app)
            .post(ROUTES.USER_LOGIN)
            .send({ email: validEmail, password: "123" });
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS);
        });

        test("Returns a token if a user successfully logs in.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email : validEmail, password : validPassword})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK)
            expect(response.body.token).toBeDefined();
        })
    })

    describe("POST/register", () => {
        test("Returns an error if the password field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email: validEmail});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.error).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns an error if the email field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({password: "helloWorld"});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.error).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns message if the incorrect email format it used.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : "Blah Blah@ Blah.com", password : validPassword})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS)
        })

        test("Returns message if the incorrect password format it used.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : "someEmail@bu.edu", password : "Hello"})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS)
        })
        test("Returns a message if the user already exist.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : validEmail, password: validPassword})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.EMAIL_ALREADY_EXIST);
        })
        
        test("Returns a message if new user is created successfully.", async () => {
            const newUserEmail  = "BostonUniversity_2023@bu.edu"
            const password      = "HelloWorld123@@"
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email: newUserEmail, password: password})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK)
            expect(response.body.message).toBe(MESSAGES.ACCOUNT_CREATED)
        })
    })

    describe("GET/protected", () => {
        let token;
        beforeEach(async () =>{
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email: validEmail, password : validPassword})
            token = response.body.token
        })
        test("Returns an error if no token is defined", async () => {
            const response = await request(app).get(ROUTES.USER_PROTECTED).send({})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
            expect(response.body.error).toBe(MESSAGES.NOT_LOGGED_IN)
        })

        test("User is logged in", async () => {
            const response = await request(app).get(ROUTES.USER_PROTECTED).set('Authorization', token)
            expect(response).toBeDefined()
        })
    })
})