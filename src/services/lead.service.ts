import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { Lead } from "../entities/Lead";
import { LeadProfile } from "../entities/LeadProfile";
import { Validator } from "../utils/validator";
import { Cleaner } from "../utils/cleaner";
import { Metrics } from "../utils/metrics";

@injectable()
export class LeadService {

    private sourceFile = path.join(
        process.cwd(),
        "src/data/sample_lead_data.json"
    );

    private outputFile = path.join(
        process.cwd(),
        "src/data/analyzed_leads.json"
    );

    analyze() {
        const rawData = fs.readFileSync(this.sourceFile, "utf-8");
        const leads: Lead[] = JSON.parse(rawData);

        const cleanedLeads: Lead[] = [];

        for (const lead of leads) {
            const cleaned = Cleaner.cleanLead(lead);

            if (
                Validator.isValidEmail(cleaned.email) &&
                Validator.isValidPhone(cleaned.phone)
            ) {
                cleanedLeads.push(cleaned);
            }
        }

        const profileMap = new Map<string, LeadProfile>();

        for (const lead of cleanedLeads) {
            if (!profileMap.has(lead.phone)) {
                profileMap.set(lead.phone, {
                    phone: lead.phone,
                    name: lead.name,
                    email: lead.email,
                    inquiries: []
                });
            }

            profileMap.get(lead.phone)!.inquiries.push(lead);
        }

        const profiles = [...profileMap.values()];
        const summary = Metrics.getSummary(cleanedLeads);

        fs.writeFileSync(
            this.outputFile,
            JSON.stringify({ profiles, summary }, null, 2)
        );

        return {
            message: "Analysis completed",
            totalRecords: leads.length,
            uniqueLeads: profiles.length,
            duplicatesFound: cleanedLeads.length - profiles.length
        };
    }

    getLead(phone: string) {
        if (!fs.existsSync(this.outputFile)) {
            return null;
        }

        const data = JSON.parse(
            fs.readFileSync(this.outputFile, "utf-8")
        );

        return data.profiles.find(
            (lead: LeadProfile) => lead.phone === phone
        );
    }

    getSummary() {
        if (!fs.existsSync(this.outputFile)) {
            return Metrics.getSummary([]);
        }

        const data = JSON.parse(
            fs.readFileSync(this.outputFile, "utf-8")
        );

        return data.summary;
    }
}
