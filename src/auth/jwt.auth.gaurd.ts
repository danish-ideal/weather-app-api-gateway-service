import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";



@Injectable()
export class jwtAuthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
             new UnauthorizedException('Token is missing')
        }
        const token = authHeader.split(' ')[1]
        try {
            const decoded = this.authService.verifyToken(token)
            return true
        } catch (error) {
            throw new UnauthorizedException('Invalid Token')
        }

    }
}