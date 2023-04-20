import supertest from "supertest";
import app from "../src/index";
import {generateRandomId} from '../src/random'
import fruits from "../src/data/fruits";

const server = supertest(app)

describe("GET /fruit", () => {

    it('Should responde with status 200 and the fruits', async () => {
        const resultado = await server.get('/fruits')

        expect(resultado.status).toBe(200)
        expect(resultado.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })
})

describe('POST /fruits', () => {
    it("Should respond status 409 when fruit already exists", async () => {
        const body =
        {
            name: "mamão",
            price: 20
        }
        const response = await server.post("/fruits").send(body)
        expect(response.status).toBe(409)
    })

    it("Should return status 200 and the fruit created if success", async () => {
        const body =
        {
            name: "morango",
            price: 20
        }
        const response = await server.post("/fruits").send(body)
        expect(response.status).toBe(201)
    
    })
})

describe ("GET /fruits/:id" , () => {
    it("Should responde with status 404 when fruit id does not exists", async () => {
        const id = generateRandomId(fruits.length, 9999)
        const response = await server.get(`/fruits/${id}`)

        expect(response.status).toBe(404)
    })

    it("Should respond with the fruits when fruit id exists", async () =>{

        const id = generateRandomId(0,fruits.length)

        const response = await server.get(`/fruits/${id}`)

        expect(response.body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        })
    })
})