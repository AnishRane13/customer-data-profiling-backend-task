import { Lead } from "../entities/Lead";

export class Metrics {

    static getSummary(leads: Lead[]) {
        const uniqueLocations = new Set(
            leads.map(l => l.location)
        ).size;

        const saleLeads = leads.filter(
            l => l.property_type === "sale"
        );

        const rentalLeads = leads.filter(
            l => l.property_type === "rental"
        );

        const avgSaleBudget =
            saleLeads.reduce((sum, l) => sum + l.budget, 0) /
            (saleLeads.length || 1);

        const avgRentalBudget =
            rentalLeads.reduce((sum, l) => sum + l.budget, 0) /
            (rentalLeads.length || 1);

        const inquiryRate: Record<string, number> = {};

        leads.forEach(lead => {
            const month = lead.contact_date.slice(0, 7);
            inquiryRate[month] = (inquiryRate[month] || 0) + 1;
        });

        return {
            totalLeads: leads.length,
            uniqueLocations,
            averageBudget: {
                sale: Number(avgSaleBudget.toFixed(2)),
                rental: Number(avgRentalBudget.toFixed(2))
            },
            inquiryRate
        };
    }
}
