import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const companies = sqliteTable("companies", {
	id: integer().primaryKey(),
	companyName: text("company_name").notNull(),
	hqCity: text("HQ_city"),
	companyHeadcount: integer("company_headcount"),
});

export const layoffs = sqliteTable("layoffs", {
	id: integer().primaryKey(),
	companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	date: text(),
	firedAmount: integer("fired_amount"),
});
