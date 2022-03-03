import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const grpcAuthServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: 'auth',
    protoPath: join(__dirname, '../../../protos/auth-service.proto'),
  },
};

@Injectable()
export class AuthService {
  @Client(grpcAuthServiceOptions)
  private readonly authServiceClient: ClientGrpc;
  private authService: any;

  async onModuleInit() {
    this.authService = this.authServiceClient.getService<any>('AuthService');
  }
  
  async testGrpc() {
    const result = await this.authService.hello({}).toPromise();
    return result;
  }
}
