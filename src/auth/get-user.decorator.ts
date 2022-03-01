import { createParamDecorator, Req } from "@nestjs/common";
import { User } from "./entities/user.entity";

export const GetUser = createParamDecorator((data, req) => {
    return req.args[0].user;
}); 