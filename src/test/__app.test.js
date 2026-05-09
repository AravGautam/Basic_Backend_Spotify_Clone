require('dotenv').config();
const req = require("supertest")
const app = require("../app")


describe("GET /", () => {
    it("should return a welcome message", async () => {
        const res = await req(app).get("/")
        expect(res.status).toBe(200)
        expect(res.body.message).toEqual('Welcome to the Spotify Clone API!')
    })
})

describe("GET /api/auth", () => {
    it("should return 404 for undefined route", async () => {
        const res = await req(app).get("/api/auth")
        expect(res.status).toBe(404)
    })
})

describe("GET /api/music", () => {
    it("should return 404 for undefined route", async () => {
        const res = await req(app).get("/api/music")
        expect(res.status).toBe(401)
    })
})
