---
title: Business, accounting and finance for games
tags: [business-sim, tycoon, accounting, finance, pricing, markets, trading, economic-data, fred, world-bank, sec-edgar, ifrs]
sources:
  - "https://fred.stlouisfed.org/docs/api/fred/"
  - "https://fred.stlouisfed.org/docs/api/fred/series_observations.html"
  - "https://fred.stlouisfed.org/docs/api/api_key.html"
  - "https://fred.stlouisfed.org/docs/api/terms_of_use.html"
  - "https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation"
  - "https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json&per_page=2"
  - "https://datacatalog.worldbank.org/public-licenses"
  - "https://www.bls.gov/developers/api_faqs.htm"
  - "https://www.sec.gov/search-filings/edgar-application-programming-interfaces"
  - "https://www.sec.gov/os/accessing-edgar-data"
  - "https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/"
  - "https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/"
  - "https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/"
  - "https://en.wikipedia.org/wiki/Accounting_equation"
  - "https://en.wikipedia.org/wiki/Price_elasticity_of_demand"
  - "https://en.wikipedia.org/wiki/Bid%E2%80%93ask_spread"
  - "https://en.wikipedia.org/wiki/Lemonade_Stand"
  - "https://en.wikipedia.org/wiki/Capitalism_(video_game)"
  - "https://en.wikipedia.org/wiki/Recettear:_An_Item_Shop%27s_Tale"
  - "https://en.wikipedia.org/wiki/Offworld_Trading_Company"
last_verified: 2026-11-16
---

# Business, accounting and finance for games

For tycoon, shop-keeping, trading and management sims, and financial-literacy games. Owner: `business-finance-expert`. Virtual currencies and live-game sinks and faucets belong to `economy-designer`; this file covers the real-world accounting and data underneath.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| FRED API | Federal Reserve Bank of St. Louis | https://fred.stlouisfed.org/docs/api/fred/ | Free key; "All web service requests require an API key"; a distinct key per application, 32 lower-case alphanumeric characters. Endpoints include `fred/series` and `fred/series/observations` | Terms require the notice "This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis." Series whose notes contain "Copyright" belong to third parties: beyond personal use you must get permission from the data owner | `series/observations` returns XML (default), JSON, xlsx or zipped CSV via `file_type` | Per series | No number published; the Bank "may impose or adjust" bandwidth limits. Do not build something that "replicates or attempts to replace" FRED. Never ship the key in a client build |
| World Bank Indicators API v2 | World Bank | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation | No key ("API keys and other authentication methods are no longer necessary"). Example: `https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json` | World Bank's own datasets default to CC BY 4.0, commercial use allowed with credit (https://datacatalog.worldbank.org/public-licenses); some datasets use ODbL, microdata or custom licences, so check metadata | JSON (`format=json`) | Per indicator; the test call today showed `lastupdated` 2026-11-11 and US GDP up to 2025 | V1 is retired. Responses are paged (`page`, `pages`, `per_page`, `total`); loop over pages |
| BLS Public Data API | US Bureau of Labor Statistics | https://www.bls.gov/developers/api_faqs.htm | v1 unregistered; v2 needs free registration | (Terms not read today) | Not checked today | Per series | v1: 25 queries a day, 25 series per query, 10 years per query. v2: 500 queries a day, 50 series, 20 years. The FAQ does not say whether limits are per IP or per user. bls.gov returned 403 to curl but loaded through WebFetch |
| SEC EDGAR APIs | US SEC | https://www.sec.gov/search-filings/edgar-application-programming-interfaces | No key: "These APIs do not require any authentication or API keys". `data.sec.gov/submissions/CIK##########.json`, `/api/xbrl/companyfacts/`, `/companyconcept/`, `/frames/` | (US government data; terms not separately read) | JSON; XBRL financial data | As filed | Fair access (https://www.sec.gov/os/accessing-edgar-data): "Current max request rate: 10 requests/second" and declare a User-Agent with a company name and admin email. Real company names and filings in a game raise trademark and defamation questions. Both sec.gov pages loaded through WebFetch but returned 403 to plain curl |

## Models and numbers for simulation

- **Accounting equation.** Assets = Liabilities + Equity. Every transaction is recorded twice so debits equal credits, and every transaction "always balances". In code, assert it every tick: a failed assert in playtest is an exploit you found.
- **Inventory (IAS 2).** Measure inventory "at the lower of cost and net realisable value". Cost formulas: specific identification for items not interchangeable, otherwise FIFO or weighted average (the summary lists no others). When goods sell, their carrying amount becomes an expense in the same period as the revenue. Write-downs to net realisable value are expenses when they happen, which gives a real "spoiled stock" event.
- **Depreciation (IAS 16).** In May 2014 the Board amended IAS 16 to "prohibit the use of a revenue-based depreciation method". Spread a machine's cost over its life (straight-line is the simplest) instead of expensing it on purchase.
- **Revenue (IFRS 15).** Five steps: identify the contract, identify performance obligations, set the transaction price, allocate it, recognise revenue when the customer obtains control. Goods usually transfer at a point in time; services over time. A season ticket or subscription should be recognised across the period, not all at sale.
- **Price elasticity.** Demand is elastic when |elasticity| > 1 (raise price and total revenue falls) and inelastic when below 1 (raise price and revenue rises). Constant-elasticity form: ln Q = K + E ln P. One elasticity per product and a reference price is enough for a shop sim.
- **Bid-ask spread.** The gap between the price to buy now and to sell now; the liquidity supplier earns it, and its size is "one measure of the liquidity of the market". Wider spreads go with thin trading. A trading game should quote two prices, not one.
- **Interest per tick.** Converting an annual rate r to a daily tick with r/365 and with (1 + r)^(1/365) - 1 gives different results over a long game. This is arithmetic; pick one, document it and test it.

## Standards and expert sources

- IFRS Foundation summaries of IAS 2, IAS 16 and IFRS 15 (ifrs.org) for the accounting rules above. US GAAP differs in places; say which one the game follows if it teaches accounting.
- FRED, World Bank, BLS for macro calibration (interest rates, inflation, GDP, wages); SEC EDGAR XBRL company facts for real-company ratios such as margins, inventory days and receivable days.
- Calibrate from data, then stylise. Store the dataset name and date next to every calibrated number in the design doc.

## Accuracy vs fun

Acceptable simplifications:
- Monthly or quarterly ticks; one blended tax rate; no payroll detail.
- Eight to fourteen accounts instead of a full chart of accounts.
- One elasticity per product category.
- An abstract "market mood" multiplier, if it is labelled as such.

Trust breakers for finance people:
- One money number, so profit and cash cannot diverge.
- Stock expensed when bought, so margins swing with purchase timing.
- Buying a factory shows as a giant one-turn loss.
- A market with one price and infinite depth, so the player can buy everything without moving the price.
- Loans with no interest, or interest compounded inconsistently.

Fun levers that are also accurate: payment terms (customers pay in 30 or 60 days), stock write-downs, price haggling, spreads that widen in a panic, a profitable firm running out of cash.

## What games get wrong

- Cash equals profit. Without receivables, payables and inventory, the classic "profitable but bankrupt" lesson cannot happen.
- Prices that do not respond to the player. Offworld Trading Company is the counter-example: supply and demand "fluctuates constantly", and heavy buying of a resource invites rivals to produce it.
- Depreciation left out, so asset purchases create fake losses and fake windfalls.
- Revenue booked up front for multi-period services.
- Stock markets that never consider liquidity, so one player can corner them.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Lemonade Stand | 1973 | Bob Jamison (MECC) | Three daily decisions (glasses, signs, price) against weather; a thunderstorm can void the day's profit | https://en.wikipedia.org/wiki/Lemonade_Stand |
| Capitalism | 1995 | Enlight (Trevor Chan) | Retail, factories, purchasing, R&D quality, an optional stock market; Harvard and Stanford began using it for teaching in 1996 | https://en.wikipedia.org/wiki/Capitalism_(video_game) |
| Recettear: An Item Shop's Tale | 2007 (JP), 2010 (EN, Carpe Fulgur) | EasyGameStation | Haggling over prices on a daily cycle with an 820,000-pix debt deadline | https://en.wikipedia.org/wiki/Recettear:_An_Item_Shop%27s_Tale |
| Offworld Trading Company | 2016 | Mohawk Games (Stardock publishing) | Prices driven by player supply and demand; win by buying majority stakes in rival companies | https://en.wikipedia.org/wiki/Offworld_Trading_Company |

## Sensitive topics and legal

- Not financial advice: any game that touches investing, trading or debt needs an in-game "simulation, not advice" line.
- Simulated trading and gambling: casino-like trading, loot boxes or real-money stakes, especially for minors, go to `game-legal-advisor` and `monetization-designer`.
- Real companies: names, logos and financial data of real firms raise trademark and defamation risk; fictionalise by default.
- Debt and poverty themes: avoid mocking real hardship; work with `narrative-director` on tone.
- Data terms: FRED notice text in credits; third-party FRED series need the owner's permission; World Bank credit under CC BY 4.0; SEC fair-access rules for any scripted pull.

## How to check this is current

- FRED: re-read the terms of use and the API key page.
- World Bank: call the GDP example URL and read `lastupdated`; re-read the licence page.
- BLS: re-read the API FAQ for v1 and v2 limits.
- SEC: re-read the fair-access page for the request rate and User-Agent format.
- IFRS: check ifrs.org for amendments to IAS 2, IAS 16 and IFRS 15.
- Games: Wikipedia infoboxes and developer sites.
