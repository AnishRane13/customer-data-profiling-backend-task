export class Lead {
    constructor(
        public lead_id: number,
        public name: string,
        public phone: string,
        public email: string,
        public property_type: "sale" | "rental",
        public budget: number,
        public location: string,
        public preferred_property_type: string,
        public contact_date: string,
        public inquiry_notes: string
    ) {}
}
