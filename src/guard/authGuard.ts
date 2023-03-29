import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        req.user = this.jwtService.verify(token);
        return true;
      } catch (err) {
        return false;
      }
    }
    // L'utilisateur n'est pas authentifié
    return false;
  }
}
