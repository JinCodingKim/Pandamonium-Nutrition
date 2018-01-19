require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const app = express();

const userCtrl = require("./controllers/user/userCtrl");
const productCtrl = require("./controllers/product/productCtrl");
const cartCtrl = require("./controllers/cart/cartCtrl");

const {
  PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  AUTH_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env;

//massive postgresql connection
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

//Middleware
app.use(json());
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//Auth0 Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: AUTH_DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      console.log(profile);
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

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3002/profile/",
    failureRedirect: "http://localhost:3001/login"
  })
);

app.get("/me", (req, res, next) => {
  console.log(req.user);
  if (req.user) res.json(req.user);
  else res.redirect("/login");
});

app.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3002/");
});

app.get("/users", userCtrl.getUsers);
app.put("/profile/update", userCtrl.userInfo);
// app.get("/products", productCtrl.getProducts);
app.get("/products", productCtrl.getDistinctProducts);
app.get("/product/:product_type", productCtrl.getProductByType);
app.post("/cart/add", cartCtrl.addCart);
app.put("/cart/update", cartCtrl.updateCart);
app.put("/cart/quantity", cartCtrl.updateCartItem);
app.delete("/cart/:product_id", cartCtrl.deleteCart);
app.get("/cart/:user_id", cartCtrl.getCart);

app.listen(PORT || 3001, () => {
  console.log(`Port Listening On: ${PORT || 3001}`);
});
