require("dotenv").config();
const {
  PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  AUTH_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  STRIPE_SECRET
} = process.env;

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const stripe = require("stripe")(STRIPE_SECRET);

const SERVER_CONFIGS = require("./constants/server");

const configureServer = require("./server");
const configureRoutes = require("./routes");

const app = express();
configureServer(app);
configureRoutes(app);
//Controllers
const userCtrl = require("./controllers/user/userCtrl");
const productCtrl = require("./controllers/product/productCtrl");
const cartCtrl = require("./controllers/cart/cartCtrl");
const payCtrl = require("./controllers/pay/payCtrl");
const reviewCtrl = require("./controllers/review/reviewCtrl");
const subscriptionCtrl = require("./controllers/subscription/subscriptionCtrl");
const guestSession = require("./middlewares/guestSession");

//Massive postgresql connection
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

//Middleware
app.use(express.static(`${__dirname}/../build`));
app.use(json());
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(guestSession);

//Auth0 Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: AUTH_DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/api/login",
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      // console.log(profile);
      //gets id from auth0 and passes in to the get_user_by_authid sql db
      app
        .get("db")
        .get_user_by_authid(profile.id)
        .then(response => {
          // console.log(`profile: ${response}`);
          if (!response[0]) {
            //if the id does not exist in the db, then insert the auth0 id and displayName into the sql db, and then sql will return this value from createUserByAuthid by using (RETURNING) key word
            app
              .get("db")
              .create_user([
                //profile is the data coming from the auth0:
                //firstname
                profile.name.givenName,
                //email
                profile.displayName,
                //age
                profile.age,
                //picture
                profile.picture,
                //auth_id
                profile.id
              ])
              .then(created => {
                // console.log(`new profile: ${created}`);
                return done(null, created[0]);
              });
          } else {
            // console.log(`profile: ${response}`);
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//Stripe
app.get("/api/payments");
app.post("/api/payments/:id", payCtrl.postPayment);

//Auth0
app.get(
  "/api/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3002/",
    failureRedirect: "http://localhost:3001/api/login"
  })
);

//Login
app.get("/api/me", (req, res, next) => {
  console.log(req.user);
  if (req.user) res.json(req.user);
  else res.redirect("/api/login");
});
//Logout
app.get("/api/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3002/");
});

//UserCtrl
app.put("/api/profile/update", userCtrl.userInfo);
app.put("/api/guest/email", userCtrl.updateGuestEmail);
app.get("/api/profile/", userCtrl.getUserByUserId);
app.put("/api/profile/shipping", userCtrl.updateShippingAddress);
app.put("/api/profile/billing", userCtrl.updateBillingAddress);
//ReviewCtrl
app.get("/api/review/:product_id", reviewCtrl.getReviews);
app.post("/api/product/review", reviewCtrl.addReview);
//SubscriptionCtrl
app.post("/api/subscription", subscriptionCtrl.postSubscriptionEmail);
//ProductCtrl
app.get("/api/products", productCtrl.getDistinctProducts);
app.get("/api/products/clear", productCtrl.getDistinctProducts);
app.get("/api/products/ascend", productCtrl.getProductsAsc);
app.get("/api/products/descend", productCtrl.getProductsDesc);
app.get("/api/products/az", productCtrl.getProductsAToZ);
app.get("/api/products/za", productCtrl.getProductsZToA);
app.get("/api/product/:product_type", productCtrl.getProductByType);
//CartCtrl
app.post("/api/cart/add", cartCtrl.addCart);
app.put("/api/cart/update", cartCtrl.updateCart);
app.put("/api/cart/quantity", cartCtrl.updateCartItem);
app.delete("/api/cart/:product_id", cartCtrl.deleteCart);
app.get("/api/cart/:user_id", cartCtrl.getCart);
app.delete("/api/checkout/:user_id", cartCtrl.removeAllCart);
//Stripe
app.post("/api/checkout", (req, res, next) => {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    // console.log(req.body);
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});

app.listen(PORT || 3001, () => {
  console.log(`Port Listening On: ${PORT || 3001}`);
});
