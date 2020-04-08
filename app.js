const express = require("express");
const stripe = require("stripe")("sk_test_JJl28DXpDbCOWyCLAUR8enZd00942HyC0g");

const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(`${__dirname}/public}`));
// index route
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/charge", (req, res) => {
  const amount = 2500;
  console.log(req.body);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "web development ebook",
        currency: "USD",
        customer: customer.id,
      })
    )
    .then((charge) => res.render("success"));
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server stated on prt ${port}`);
});
