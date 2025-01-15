import request from "supertest";
import app from "../src/app"; 
import { describe, it, expect, afterAll } from "@jest/globals";
import { disconnectFromDB } from "../src/db/connection";

describe("Queue API Tests", () => {
  it("should start a computation job", async () => {
    const response = await request(app)
      .post("/api/compute")
      .send({ a: 10, b: 5 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("jobId");
  });

  it("should fetch progress for a valid jobId", async () => {
    const computeResponse = await request(app)
      .post("/api/compute")
      .send({ a: 20, b: 10 });
    const jobId = computeResponse.body.jobId;

    const progressResponse = await request(app).get(`/api/progress/${jobId}`);
    expect(progressResponse.status).toBe(200);
    expect(progressResponse.body).toHaveProperty("progress");
  });
});

afterAll(async () => {
    await disconnectFromDB();
});