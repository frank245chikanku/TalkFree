import { MongoMemoryServer } from 'mongodb-memory-server' 
import mongoose from  'mongoose'  
import { app } from '../app' 
import request from 'supertest'    

declare global {
    var signin: () => Promise<string[]>

}

let mongo: any;  

beforeAll(async () => {
    process.env.JWT_KEY = 'chikanku'; 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED ='0'; 
    
    mongo = await MongoMemoryServer.create(); 
    let mongoUri = await mongo.getUri();  

    await mongoose.connect(mongoUri); 
})

beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections(); 

    if (!collections) return;           
    for (let collection of collections) {
        await collection.deleteMany({});       
    }
});


afterAll(async () => {
    await mongo.stop(); 
    await mongoose.connection.close()

}) 

var globalsignin = async () => {
    const res = await request(app).post('/signup').send({
        email: "email@email.com", 
        password: "123456"
    }).expect(201) 

    const cookie = res.get('Set-Cookie')  

    return cookie
}



function beforeAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}


function beforeEach(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}


function afterAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');   
}

