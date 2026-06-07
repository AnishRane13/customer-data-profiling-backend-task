import { Lead } from "./Lead";

export class LeadProfile {
    constructor(
        public phone: string,
        public name: string,
        public email: string,
        public inquiries: Lead[]
    ) {}
}
