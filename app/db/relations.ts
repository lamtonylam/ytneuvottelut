import { relations } from "drizzle-orm/relations";
import { companies, layoffs } from "./schema";

export const layoffsRelations = relations(layoffs, ({one}) => ({
	company: one(companies, {
		fields: [layoffs.companyId],
		references: [companies.id]
	}),
}));

export const companiesRelations = relations(companies, ({many}) => ({
	layoffs: many(layoffs),
}));