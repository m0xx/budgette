# budgette
Simple tool to create personal budget projection

# Installation

```bash
npm install -g budgette
```

# Getting Started

Let's get started by creating a projection for the next year. 

Let's say we have 250$ in our bank account, we have (1) customer who pay us 125$ / year for hosting service and we host his site on Digital Ocean for 5$ / month!

What's our projection?

#### Create a file named `my-budget.yml` example:
```yaml
budgets:
  - description: Initial adjustement
    date: 2017-01-01
    amount: 250
  - description: Customer ABC Hosting
    date: 2017-01-01
    every: 1 year
    amount: 125
  - description: Digital Ocean
    date: 2016-11-15
    every: 1 month
    amount: -5
```

#### Then execute
```bash
budgette -b my-budget.yaml --start 2017-01-01 --end 2017-12-31
```

#### Result

```
┌──────────────────────┬────────────────────┬─────────┬───────┐
│ Description          │ Date               │ Amount  │ Total │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Initial adjustement  │ January 1, 2017    │ + 250 $ │ 250 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Customer ABC Hosting │ January 1, 2017    │ + 125 $ │ 375 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ January 15, 2017   │ - 5 $   │ 370 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ February 15, 2017  │ - 5 $   │ 365 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ March 15, 2017     │ - 5 $   │ 360 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ April 15, 2017     │ - 5 $   │ 355 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ May 15, 2017       │ - 5 $   │ 350 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ June 15, 2017      │ - 5 $   │ 345 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ July 15, 2017      │ - 5 $   │ 340 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ August 15, 2017    │ - 5 $   │ 335 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ September 15, 2017 │ - 5 $   │ 330 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ October 15, 2017   │ - 5 $   │ 325 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ November 15, 2017  │ - 5 $   │ 320 $ │
├──────────────────────┼────────────────────┼─────────┼───────┤
│ Digital Ocean        │ December 15, 2017  │ - 5 $   │ 315 $ │
└──────────────────────┴────────────────────┴─────────┴───────┘
```