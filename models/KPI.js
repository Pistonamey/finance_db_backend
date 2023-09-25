import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currencySetter = (v) => typeof v === 'string' ? parseFloat(v.replace(/[^\d.-]/g, "")) * 100 : v;
const currencyGetter = (v) => v / 100;

const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    expenses: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
  },
  { toJSON: { getters: true } }
);

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    expenses: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    operationalExpenses: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    nonOperationalExpenses: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
  },
  { toJSON: { getters: true } }
);

const KPISchema = new Schema(
  {
    totalProfit: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    totalRevenue: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    totalExpenses: {
      type: Number,
      set: currencySetter,
      get: currencyGetter,
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: Number,
        set: currencySetter,
        get: currencyGetter,
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
