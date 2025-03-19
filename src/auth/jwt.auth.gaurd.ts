import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";



@Injectable()
export class jwtAuthGuard implements CanActivate{
    constructor(private authService:AuthService,private configService:ConfigService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
             new UnauthorizedException('Token is missing')
        }
        const token = authHeader.split(' ')[1]
        try {
            const decoded = this.authService.verifyToken(token)
            console.log('This is an authenticated user',token);
            return true
        } catch (error) {
            throw new UnauthorizedException('Invalid Token')
        }

    }
}