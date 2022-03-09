import { Controller, Get, Render } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @GrpcMethod('AuthService', 'Hello')
  async hello(): Promise<any> {
    return { text: 'Hello GRPC' };
  }
}
