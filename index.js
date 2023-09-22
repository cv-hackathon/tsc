require("dotenv/config");

const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const KJUR = require("jsrsasign");

const app = express();
app.use(bodyParser.json(), cors());
app.options("*", cors());

const TOKENS = {
  accessToken: "",
  accessTokenExpire: "",
  refreshToken: "",
  zak: "",
  zakExpire: "",
};

app.get("/", (req, res) => {
  if (req.query.code) {
    let url =
      "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
      req.query.code +
      "&redirect_uri=" +
      process.env.redirectURL;

    const secret = Buffer.from(
      process.env.clientID + ":" + process.env.clientSecret,
      "utf8"
    ).toString("base64");

    const options = {
      url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + secret,
      },
    };

    request.post(options, (error, response, body) => {
      // Parse response to JSON
      body = JSON.parse(body);
      console.log(body);

      if (body.access_token) {
        TOKENS.accessToken = body.access_token;
        TOKENS.refreshToken = body.refresh_token;
        TOKENS.accessTokenExpire =
          new Date().getTime() + body.expires_in * 1000;
        // Step 4:
        // We can now use the access token to authenticate API calls
        // Send a request to get your user information using the /me context
        // The `/me` context restricts an API call to the user the token belongs to
        // This helps make calls to user-specific endpoints instead of storing the userID
        // request
        //   .get("https://api.zoom.us/v2/users/me", (error, response, body) => {
        //     if (error) {
        //       console.log("API Response Error: ", error);
        //     } else {
        //       body = JSON.parse(body);
        //       // Display response in console
        //       console.log("API call ", body);
        //       // Display response in browser
        //       var JSONResponse =
        //         "<pre><code>" + JSON.stringify(body, null, 2) + "</code></pre>";
        //       res.send(`
        //                     <style>
        //                         @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap');@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');html {color: #232333;font-family: 'Open Sans', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}h2 {font-weight: 700;font-size: 24px;}h4 {font-weight: 600;font-size: 14px;}.container {margin: 24px auto;padding: 16px;max-width: 720px;}.info {display: flex;align-items: center;}.info>div>span, .info>div>p {font-weight: 400;font-size: 13px;color: #747487;line-height: 16px;}.info>div>span::before {content: "👋";}.info>div>h2 {padding: 8px 0 6px;margin: 0;}.info>div>p {padding: 0;margin: 0;}.info>img {background: #747487;height: 96px;width: 96px;border-radius: 31.68px;overflow: hidden;margin: 0 20px 0 0;}.response {margin: 32px 0;display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;}.response>a {text-decoration: none;color: #2D8CFF;font-size: 14px;}.response>pre {overflow-x: scroll;background: #f6f7f9;padding: 1.2em 1.4em;border-radius: 10.56px;width: 100%;box-sizing: border-box;}
        //                     </style>
        //                     <div class="container">
        //                         <div class="info">
        //                             <img src="${body.pic_url}" alt="User photo" />
        //                             <div>
        //                                 <span>Hello World!</span>
        //                                 <h2>${body.first_name} ${body.last_name}</h2>
        //                                 <p>${body.role_name}, ${body.company}</p>
        //                             </div>
        //                         </div>
        //                         <div class="response">
        //                             <h4>JSON Response:</h4>
        //                             <a href="https://marketplace.zoom.us/docs/api-reference/zoom-api/users/user" target="_blank">
        //                                 API Reference
        //                             </a>
        //                             ${JSONResponse}
        //                         </div>
        //                     </div>
        //                 `);
        //     }
        //   })
        //   .auth(null, null, true, body.access_token);

        // const opts = {
        //   url: "https://api.zoom.us/v2/users/{userId}/token?type=zak",
        //   Authorization: `Bearer ${body.access_token}`,
        // };
        getZak(body.access_token, (err, rsp, body) => {
          console.log(body);
          body = JSON.parse(body);
          TOKENS.zak = body.token;
          TOKENS.zakExpire = new Date().getTime() + 3599 * 1000;
          res.send(`<html>
          <body>
            <script>
                console.log('done oauth')
                window.close()
            </script>
          </body>
          </html>`);
        });
      } else {
        // Handle errors, something's gone wrong!
        res.sendStatus(500);
      }
    });

    return;
  }

  res.redirect(
    "https://zoom.us/oauth/authorize?response_type=code&client_id=" +
      process.env.clientID +
      "&redirect_uri=" +
      process.env.redirectURL
  );
});

app.get("/getZak", (req, res) => {
  getZak(TOKENS.accessToken, (err, rsp, body) => {
    console.log(body);
    body = JSON.parse(body);
    TOKENS.zak = body.token;
    TOKENS.zakExpire = new Date().getTime() + 3599;
    res.json({ zak: body.token });
  });
});

function getZak(access_token, callback) {
  request
    .get("https://api.zoom.us/v2/users/me/token?type=zak", callback)
    .auth(null, null, true, access_token);
}

app.post("/", (req, res) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: process.env.clientID,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: process.env.clientID,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    process.env.clientSecret
  );

  console.log(iat, exp);

  TOKENS["signature" + oPayload.role] = signature;
  TOKENS["signatureExpire" + oPayload.role] = exp * 1000;

  res.json({
    signature: signature,
    expire: TOKENS["signatureExpire" + oPayload.role],
  });
});

app.get("/tokens", (req, res) => {
  res.json(TOKENS);
});

app.listen(4000, () =>
  console.log(`Zoom Hello World app listening at PORT: 4000`)
);
