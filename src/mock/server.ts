import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { SERVER_URL } from "../constants";
import employeesData from "./data/employees.json";

export const worker = setupWorker(
  http.get(`${SERVER_URL}/api/v1/employees`, async () => {
    return HttpResponse.json(employeesData, {
      status: 200,
      statusText: "Mocked status",
    });
  })
);
