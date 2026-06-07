# Implementation Notes

## Overview

This solution implements a Real Estate Lead Profiling and Management System using TypeScript, Express, InversifyJS, and inversify-express-utils.

The application imports lead data from a JSON file, validates and cleans the data, identifies duplicate leads using phone numbers, generates lead profiles, and provides lead analytics through REST APIs.

---

## Architecture

The project follows a layered architecture:

* Controllers: Handle HTTP requests and responses.
* Services: Contain business logic and data processing.
* Entities: Define the core data models (Lead, LeadProfile).
* Utilities: Handle validation, cleaning, and metrics calculations.

---

## Lead Processing Flow

### POST /analyze

The analysis process performs the following steps:

1. Reads lead data from `sample_lead_data.json`.
2. Validates email and phone number formats.
3. Cleans and standardizes lead information.
4. Identifies duplicate leads using phone numbers.
5. Groups multiple inquiries under a single lead profile.
6. Stores processed lead profiles in `analyzed_leads.json`.

---

## Duplicate Handling

Phone number is treated as the unique identifier for a lead.

If multiple records share the same phone number, they are consolidated into a single Lead Profile while preserving all associated inquiries.

Example:

* Sale Inquiry
* Rental Inquiry

Both records are stored under the same profile when the phone number matches.

---

## APIs Implemented

### POST /analyze

Imports, validates, cleans, profiles, and stores lead data.

### GET /lead/:leadPhoneNumber

Returns the complete lead profile associated with a phone number, including all related inquiries.

### GET /leadSummary

Returns lead analytics including:

* Total Leads
* Unique Location Count
* Average Budget for Sale Leads
* Average Budget for Rental Leads
* Inquiry Frequency by Month

---

## Bonus Features Implemented

### Average Budget by Lead Type

Calculated separately for:

* Sale Leads
* Rental Leads

### Inquiry Rate Analysis

Inquiry frequency is calculated using contact dates and grouped by month.

### Lead Consolidation

Multiple inquiries from the same customer are grouped into a single lead profile using phone number matching.

---

## Assumptions

* Phone number is treated as the unique identifier as specified in the assignment.
* Invalid records (invalid email or phone number) are excluded during analysis.
* Lead summary metrics are generated from validated lead data.
