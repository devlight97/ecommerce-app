import { Controller, Get, Post, UseGuards, Request, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  @Render('index')
  async renderLoginPage() {
    return
  }

  @Get('/test')
  async test() {
    return 'test api haizzz';
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const access_token = await this.authService.login(req.user)
    return access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
