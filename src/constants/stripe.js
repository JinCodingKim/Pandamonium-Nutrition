const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_live_MY_PUBLISHABLE_KEY"
    : "pk_test_hupM6s14kQbOFeFdl1LotXoZ";

export default STRIPE_PUBLISHABLE;
