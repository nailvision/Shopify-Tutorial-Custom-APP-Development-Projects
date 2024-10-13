
import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpCode, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';


@Controller('shopify-oauth')
export class AppController {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) {}


     global_access_token = "";

    @Get('init')
    @HttpCode(302)
    @Redirect()
    async init(@Query() query: any) {
        console.log("i am in init");
        const myres = {
            url: `https://${
                query.shop
            }/admin/oauth/authorize?client_id=${this.configService.get(
                'shopify.appProxy.clientId'
            )}&scope=${this.configService
                .get('shopify.appProxy.scopes')
                .join(',')}&redirect_uri=${this.configService.get(
                'apiUrl'
            )}/shopify-oauth/redirect&state={nonce}&grant_options[]={access_mode}`
        };
        console.log(myres);
        return myres;
    }

    @Get('redirect')
    @HttpCode(302)
    @Redirect()
    async oauthRedirect(@Query() query: any) {
        console.log('i am in redirect ' + query.code);
        const response = await lastValueFrom(
            this.httpService.post(
                `https://${query.shop}/admin/oauth/access_token`,
                {
                    client_id: this.configService.get(
                        'shopify.appProxy.clientId'
                    ),
                    client_secret: this.configService.get(
                        'shopify.appProxy.clientSecret'
                    ),
                    code: query.code
                }
            )
        );

        console.log("Token Response - " + String(response.data));
        console.log("Token Response2 - " + response.data.access_token);
        this.global_access_token = response.data.access_token;

        return {
          url: `https://${query.shop}/admin/apps?shop=${query.shop}`
      };
    }


    @Get('getproduct')
    async getProduct(@Query() query: any): Promise<any> {
        console.log('Fetching product from shopify shore ' + query.store + ' with   Product id' + query.productid);

      

        const productResponse = await lastValueFrom(
            this.httpService.get(`https://<storename>/admin/api/2024-01/products/8479719555203.json`, {
                headers: {
                  'X-Shopify-Access-Token' : '<shopify store access token>'
                }
              })
        );

        console.log("Product Response2 - " + productResponse.data.product);
        console.log("Product Response - " + JSON.stringify(productResponse.data));
       

        const productData = JSON.stringify(productResponse.data);
    

        return productData;
    }
}

