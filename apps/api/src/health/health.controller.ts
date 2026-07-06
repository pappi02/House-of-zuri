import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "OK",
      timestamp: new Date().toISOString(),
      version: "0.0.1",
    };
  }
}
