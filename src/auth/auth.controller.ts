import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SignInUserCommand } from "./commands/impl/sign-in-user.command";
import { SignInUserRequestDto } from "./dtos-swagger/sign-in-user-request.dto";
import { SignUpUserRequestDto } from "./dtos-swagger";
import { SignUpUserCommand } from "./commands/impl/sign-up-user.command";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {
  }

  @Post("/sign-in")
  @ApiOperation({ description: "sign in" })
  @ApiBearerAuth()
  async signInUser(
    @Body() signInUserRequestDto: SignInUserRequestDto,
  ) {
    return this.commandBus.execute(new SignInUserCommand(signInUserRequestDto));
  }

  @Post("/sign-up")
  @ApiOperation({ description: "register user" })
  async signUp(@Body() signUpUserRequestDtop: SignUpUserRequestDto) {
    return this.commandBus.execute(new SignUpUserCommand(signUpUserRequestDtop));
  }

}
