const app = require('../../server') // Link to your server file
const supertest = require('supertest')

it('service signup POST', async done => {
    const response = await supertest(app)
        .post("/api/auth/signup")
        .send({
            'email' : 'w3@g.com',
            'full_name' : 'wilder',
            'address' : 'Venezuela, Caracas',
            'phone' : '+585555555',
            'password' : '12345678'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    expect(response.status).toBe(201)
    expect(response.body.status).toBe('success')
    done()
})

it('service signin POST', async done => {
    const response = await supertest(app)
        .post("/api/auth/signin")
        .send({
            'email': 'w3@g.com',
            'password': '12345678'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('success')
    done()
})

it('service delete Delete', async done => {
    const response = await supertest(app)
        .delete("/api/users/delete")
        .send({
            'email': 'w3@g.com'
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.text).toBe('success')
    done()
})


