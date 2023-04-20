const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require('supertest')
const app = require('../src/app')
const mongoose = require("mongoose");
require('dotenv').config()
const User = mongoose.model("User");
const {connectToDatabase, dropCollections,disconnectFromDatabase} = require('../config/mongoDbConfig')
const {HTTP_STATUS_CODES,MESSAGES,ROUTES} = require('../utils/server.constants')

let mongoServer;

const validCredentials = {
    email:          "test@bu.edu",
    password:       "Team2RepoProject@",
    adminCode:      process.env.ADMIN_CODE
}

const invalidCredentials = {
    email:          "blah blah @blah . blah",
    password:        "123",
    adminCode:      process.env.ADMIN_CODE + "Adding_Some_Additional_Stuff"   
}

describe("Test user controller file", ()=> {
    beforeAll(async ()=> {
        mongoServer = await MongoMemoryServer.create()
        let mongoUri = mongoServer.getUri();
        //create the database using the in memory server
        await connectToDatabase(mongoUri)
    })
    
    beforeEach(async ()=> {
        const newUser = User ({
            email       : validCredentials.email,
            password    : validCredentials.password
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
        test("Returns an message if the password field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email: validCredentials.email});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns an message if the email field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({password: validCredentials.password});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.FIELDS_MISSING);
        });
        
        test("Returns message if an email is not found.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({ email: invalidCredentials.email, password: validCredentials.password });
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS);
        });
        
        test("Returns message if the incorrect password is used to log in.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({ email: validCredentials.email, password: invalidCredentials.password });
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);
            expect(response.body.message).toBe(MESSAGES.INVALID_CREDENTIALS);
        });

        test("Returns a token if a user successfully logs in.", async () => {
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email : validCredentials.email, password : validCredentials.password})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK)
            expect(response.body.token).toBeDefined();
        })
    })

    describe("POST/register", () => {
        test("Returns an message if the password field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email: validCredentials.email, adminCode : validCredentials.adminCode});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns an message if the email field is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({password: validCredentials.password, adminCode : validCredentials.adminCode});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns an message if the admin code is missing.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : validCredentials.email, password: validCredentials.password});
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.FIELDS_MISSING);
        });

        test("Returns a message if the admin code does not match", async () =>{
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : validCredentials.email, password: validCredentials.password, adminCode : invalidCredentials.adminCode})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
            expect(response.body.message).toBe(MESSAGES.INVALID_ADMIN_CODE)
        });

        test("Returns mongoose validation error name if the incorrect email format it used.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : invalidCredentials.email, password : validCredentials.password, adminCode : validCredentials.adminCode})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
            expect(response.body.name).toBe('ValidationError')
        })

        test("Returns mongoose validation error name if the incorrect password format it used.", async () => {
            const email = "Cs473_Team2@bu.edu"
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : email, password : invalidCredentials.password, adminCode : validCredentials.adminCode})
            console.log(response.body.message)
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
            expect(response.body.name).toBe('ValidationError')
        })
        test("Returns a message if the user already exist.", async () => {
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email : validCredentials.email, password: validCredentials.password, adminCode : validCredentials.adminCode})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY);
            expect(response.body.message).toBe(MESSAGES.EMAIL_ALREADY_EXIST);
        })
        
        test("Returns a message if new user is created successfully.", async () => {
            const newUserEmail  = "BostonUniversity_2023@bu.edu"
            const password      = "HelloWorld123@@"
            const response = await request(app).post(ROUTES.USER_REGISTER).send({email: newUserEmail, password: password, adminCode : validCredentials.adminCode})
            expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK)
            expect(response.body.message).toBe(MESSAGES.ACCOUNT_CREATED)
        })
    })

    describe("GET/protected", () => {
        let token;
        beforeEach(async () =>{
            const response = await request(app).post(ROUTES.USER_LOGIN).send({email: validCredentials.email, password : validCredentials.password})
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