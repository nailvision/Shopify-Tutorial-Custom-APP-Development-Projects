"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getHello() {
        return 'Hello World!';
    }
    async getProduct(productId) {
        console.log("i am in service");
        const productResponse = this.httpService.get(`https://quickstart-d769e77e.myshopify.com/admin/api/2024-01/products/7395755884626.json`, {
            headers: {
                'X-Shopify-Access-Token': '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'
            }
        });
        console.log(JSON.stringify(productResponse));
        console.log(JSON.stringify(productResponse));
        console.log("Product Response - " + productResponse);
        console.log("Product Response2 - " + productResponse);
        console.log("Product Response3 - " + productResponse);
        return productResponse;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map