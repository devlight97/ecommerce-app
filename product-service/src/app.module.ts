import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcModule } from './grpc/grpc.module';
import { AuthServiceModule } from './auth/auth.module';

@Module({
  imports: [GrpcModule, AuthServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
