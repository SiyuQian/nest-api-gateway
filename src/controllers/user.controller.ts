import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, HttpStatus, Inject, Logger, Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from 'src/dto/user.dto';

const logger = new Logger('User');

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}
  
  @Get()
  @ApiQuery({name: "token"})
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
  public async getUserByToken(@Query() query) {
    const token = query.token;

    if (token == undefined) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "No token value."
      }
    }

    const response = await firstValueFrom(
      this.userServiceClient.send('user_by_token', query.token)
    );
    
    logger.log(response);
    return {
      status: HttpStatus.OK,
      message: "xxxx"
    }
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const res = await firstValueFrom(
        this.userServiceClient.send('create_user', createUserDto)
      );
      const message = `The user has been created successfully with document id ${res}`;
      return {
        status: HttpStatus.OK,
        message: message,
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_GATEWAY,
        message: `Failed to create the user.`,
        exception: error
      }
    }
  }
}