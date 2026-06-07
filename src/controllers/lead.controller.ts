import {
    controller,
    httpPost,
    httpGet,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import { LeadService } from "../services/lead.service";

@controller("/lead")
export class LeadController {

    constructor(
        @inject(LeadService) private leadService: LeadService
    ) {}

    @httpPost("/analyze")
    analyze() {
        return this.leadService.analyze();
    }

    @httpGet("/summary/all")
    getSummary() {
        return this.leadService.getSummary();
    }

    @httpGet("/:phone")
    getLead(
        @requestParam("phone") phone: string
    ) {
        return this.leadService.getLead(phone);
    }
}
