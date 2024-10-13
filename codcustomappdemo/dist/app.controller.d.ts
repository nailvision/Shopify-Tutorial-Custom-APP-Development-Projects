import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private configService;
    private httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    global_access_token: string;
    init(query: any): Promise<{
        url: string;
    }>;
    oauthRedirect(query: any): Promise<{
        url: string;
    }>;
    getProduct(query: any): Promise<any>;
}
