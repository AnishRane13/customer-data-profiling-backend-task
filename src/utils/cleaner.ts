import { Lead } from "../entities/Lead";

export class Cleaner {

    static cleanLead(lead: Lead): Lead {
        return {
            ...lead,
            email: lead.email.trim().toLowerCase(),
            phone: lead.phone.trim(),
            location: lead.location.trim(),
            preferred_property_type: lead.preferred_property_type.trim().toLowerCase(),
            property_type: lead.property_type.trim().toLowerCase() as "sale" | "rental"
        };
    }

}
