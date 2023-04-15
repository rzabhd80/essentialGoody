import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SignInUserCommand } from "./commands/impl/sign-in-user.command";
import { SignInUserRequestDto } from "./dtos-swagger/sign-in-user-request.dto";

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
    return this.commandBus.execute<SignInUserCommand>(new SignInUserCommand(signInUserRequestDto));
  }

}
