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
const exerciseCtrl = require("./controllers/exercise/exerciseCtrl");
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
      app
        .get("db")
        .get_user_by_authid(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .create_user([
                profile.name.givenName,
                profile.displayName,
                profile.age,
                profile.picture,
                profile.id
              ])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
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
  if (req.user) res.json(req.user);
  else res.redirect("/api/login");
});
//Logout
app.get("/api/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3002/");
});

//ExerciseCtrl
app.get("/api/exercises", exerciseCtrl.getExercises);
app.get("/api/exercise/images", exerciseCtrl.getExerciseImages);
app.post("/api/exercise/add", exerciseCtrl.addExercise);
app.put("/api/exercise/update", exerciseCtrl.updateExercise);
app.get("/api/favorites", exerciseCtrl.getUserExercises);
app.post("/api/favorites/add", exerciseCtrl.addUserExercise);
app.put("/api/favorites/update", exerciseCtrl.updateUserExercise);
app.delete("/api/favorites/:exercise_id", exerciseCtrl.deleteUserExercise);
//UserCtrl
app.put("/api/profile/update", userCtrl.userInfo);
app.put("/api/guest/email", userCtrl.updateGuestEmail);
app.get("/api/profile", userCtrl.getUserByUserId);
app.put("/api/profile/shipping", userCtrl.updateShippingAddress);
app.put("/api/profile/billing", userCtrl.updateBillingAddress);
//ReviewCtrl
app.get("/api/review/:product_id", reviewCtrl.getReviews);
app.post("/api/product/review", reviewCtrl.addReview);
//SubscriptionCtrl
app.post("/api/subscription", subscriptionCtrl.postSubscriptionEmail);
//ProductCtrl
app.get("/api/products", productCtrl.getDistinctProducts);
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
