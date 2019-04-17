const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Admin  = require('../models/administrators');
const College = require('../models/colleges');
const Faculty = require('../models/faculty');

beforeEach(async () => {
    await Admin.deleteMany();
    await College.deleteMany();
    await Faculty.deleteMany();
})

test('Adding new college',async () => {
    await request(app).post('/api/college/add').send({
        "college":{
            "name": "DA-IICT",
            "location": {
                "country": "India",
                "city": "Gandhinagar"
            }
        },
        "admin":{
            "name":"Ramesh",
            "username":"Ramesh",
            "password":"1234",
            "type":"college"
        }
    }).expect(200)
})

const adminInstance1 = {
    "name":"suresh",
    "username":"suresh",
    "password":"1234",
    "type":"college"
}

const adminInstance2 = {
    "name":"Mahesh",
    "username":"Mahesh",
    "password":"12345678",
    "type":"college"
}

test('updating new college',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    console.log(college._id);
    const updatedCollegeData = {
        "college":{
            "name": "Nirma",
            "location": {
                "country": "India",
                "city": "Ahmedabad",
                },
                "_id": college._id
            },
        "admin":{
            "name": "Suresh",
            "username":"new_admin",
            "password":"12345678",
            "type":"college",
            "_id": admin._id
            },
        }
    const res = await request(app).put('/api/college/update').send(updatedCollegeData).expect(200)
})

test('delete exisiting college',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const deleteRoute = "/api/college/" + college._id;
    const res = await request(app).delete(deleteRoute).expect(200);
})

test('get college by _id',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const getRoute = "/api/college/" + college._id;
    const res = await request(app).get(getRoute).expect(200);
})

test('get college by query',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const queryWord = "Gandhinagar";
    const getRoute = "/api/college/search/" + queryWord;
    const res = await request(app).get(getRoute).expect(200);
})

const facultyInstance1 = {
    "name": "Suman Mitra",
    "college": {
        "name": "DA-IICT"
    },
    "department": "computerScience",
    "contactDetails":{
        "emailId" : "sumanmitra@daiict.ac.in",
        "phoneNo" : {
            "countryCode": "91",
            "Number": "9876543210"
        }
    }
}

test('get faculty by _id',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const faculty = await Faculty.create(facultyInstance1);

    const getRoute = "/api/faculty/" + faculty._id;
    const res = await request(app).get(getRoute).expect(200);
})

test('search faculty by query',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const faculty = await Faculty.create(facultyInstance1);

    const queryWord = "CNN";
    const getRoute = "/api/faculty/search/" + queryWord;
    const res = await request(app).get(getRoute).expect(200);
})

test('add faculty new faculty',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });

    const faculty = await Faculty.create(facultyInstance1);

    const facultyObj = {
        "faculty": {
            "name": "Suman Mitra",
            "college": {
                "name": "DA-IICT",
                "id": college._id
            },
            "department": "computerScience",
            "contactDetails":{
                "emailId" : "sumanmitra@daiict.ac.in",
                "phoneNo" : {
                    "countryCode": "91",
                    "Number": "9876543210"
                }
            }
        }
    }
    const getRoute = "/api/faculty/add/";
    const res = await request(app).post(getRoute).send(facultyObj).expect(200);
})

test('update faculty',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });
    const faculty = await Faculty.create(facultyInstance1);
    const newFacultyData = {
        "name": "Suman S Mitra",
        "college": {
            "name": "PDPU"
        },
        "department": "computerScience",
        "contactDetails":{
            "emailId" : "sumanmitra@pdpu.ac.in",
            "phoneNo" : {
                "countryCode": "91",
                "Number": "9876543210"
            }
        }
    }

    const getRoute = "/api/faculty/update";
    const res = await request(app).put(getRoute).expect(200);
})

test('update faculty',async () => {
    const admin = await Admin.create(adminInstance1);
    const college = await College.create({
        "name": "DA-IICT",
        "location": {
        "country": "India",
        "city": "Gandhinagar"
        },
        "administrator": admin._id
    });
    const faculty = await Faculty.create(facultyInstance1);

    const getRoute = "/api/faculty/" + faculty._id;
    const res = await request(app).delete(getRoute).expect(200);
})

test('test signIn', async () => {
    admin = await Admin.create(adminInstance1);
    const adminInstanceTest = {
        "username" : "suresh",
        "password" : "1234"
    }
    const getRoute = "/api/signin/";
    const res = await request(app).post(getRoute).send(adminInstanceTest).expect(200);
})