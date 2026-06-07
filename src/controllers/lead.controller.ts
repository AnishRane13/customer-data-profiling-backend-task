import {
    controller,
    httpPost,
    httpGet,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import { LeadService } from "../services/lead.service";

@controller("")
export class LeadController {

    constructor(
        @inject(LeadService) private leadService: LeadService
    ) {}

    @httpPost("/analyze")
    analyze() {
        return this.leadService.analyze();
    }

    @httpGet("/lead/:phone")
    getLead(
        @requestParam("phone") phone: string
    ) {
        return this.leadService.getLead(phone);
    }

    @httpGet("/leadSummary")
    getSummary() {
        return this.leadService.getSummary();
    }
}
