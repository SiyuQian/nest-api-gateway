import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, HttpStatus, Inject, Logger, Req } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

const logger = new Logger('Auth');

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    // @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get()
  @ApiOkResponse(
    {
      status: HttpStatus.OK,
    }
  )
  @ApiBadRequestResponse(
    {
      status: HttpStatus.BAD_GATEWAY
    }
  )
  public async getUserByToken() {
    // const user = request.user;
    // const response  = await firstValueFrom(
    //   this.userServiceClient.send('user_by_token', user.token);
    // );
    return {
      status: HttpStatus.OK,
      message: "xxxx"
    }
  }
}