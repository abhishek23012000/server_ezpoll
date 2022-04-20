const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ezpoll.india@gmail.com",
    pass: "ezpoll@123",
  },
});

const sendMail = async (
  email,
  secretToken,
  registrationNumber,
  mode,
  position_id
) => {
  try {
    if (mode == "OTP") {
      return await transport.sendMail({
        from: "ezpoll.india@gmail.com",
        to: email,
        subject: "Voting App",
        html: `

        <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
      * {
        font-family: "Quicksand", sans-serif;
      }
      .logo {
        margin-left: 30px;
        color: #ffffff !important;
        font-weight: 600;
        font-size: 40px;
      }
      .logo:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
      .h3 {
        font-size: 22px;
        font-weight: bolder;
        color: #038cfe;
      }
      .linkToVote {
        font-size: 1.5rem;
        margin-top: -5%;
        margin-bottom: 10%;
      }

      @media screen and (max-width: 800px) {
        .headLine {
          background-color: #038cfe;
          width: 100vw; /* The width is 100%, when the viewport is 800px or smaller */
        }
      }
    </style>
  </head>
  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #ffffff;
      color: #000000;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td
            style="
              word-break: break-word;
              border-collapse: collapse !important;
              vertical-align: top;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 550px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #038cfe;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #038cfe;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 550px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_image_1"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 0px;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        class="headLine"
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                          /* background-color: #2b2b2b; */
                                        "
                                        align="center"
                                      >
                                        <h3 class="logo">EZPoll</h3>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 550px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');
                    background-repeat: no-repeat;
                    background-position: center top;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 550px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_image_4"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 50px 10px 25px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          align="center"
                                          border="0"
                                          src="https://cdn.templates.unlayer.com/assets/1636374086763-hero.png"
                                          alt="Hero Image"
                                          title="Hero Image"
                                          style="
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            clear: both;
                                            display: inline-block !important;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 54%;
                                            max-width: 286.2px;
                                          "
                                          width="286.2"
                                          class="v-src-width v-src-max-width"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 20px 5px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <h2
                                  style="
                                    margin: 0px;
                                    color: #141414;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                    font-weight: normal;
                                    font-family: 'Open Sans', sans-serif;
                                    font-size: 28px;
                                  "
                                >
                                  <strong
                                    >Here are your Login Credentials</strong
                                  >
                                </h2>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              ></td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 15px 10px 12px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <h1
                                  style="
                                    margin: 0px;
                                    color: #3b4d63;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                    font-weight: normal;
                                    font-family: arial, helvetica, sans-serif;
                                    font-size: 41px;
                                  "
                                >
                                  <strong>
                                    <div class="h3">
                                      Username : ${registrationNumber}
                                    </div>
                                    <div class="h3">
                                      Password : ${secretToken}
                                    </div>
                                    <br />
                                    <div class="linkToVote">
                                      Click here to visit the Voting Portal :
                                      https://ezpoll-india.herokuapp.com/voterLogin/${position_id}
                                    </div>
                                  </strong>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 117px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    color: #2b2b2b;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                      "
                                      ><strong
                                        ><span
                                          class="footr"
                                          style="
                                            /* font-family: Lato, sans-serif; */
                                            line-height: 25.2px;
                                            font-size: 18px;
                                          "
                                          >This is an auto generated email.
                                          Please do not reply to this.</span
                                        ></strong
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>

   
      `,
      });
    } else if (mode == "VOTEROTP") {
      // email, OTP, tempCandidate, "VOTEROTP"
      return await transport.sendMail({
        from: "ezpoll.india@gmail.com",
        to: email,
        subject: "Voting App",
        html: `

        <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
      * {
        font-family: "Quicksand", sans-serif;
      }
      .logo {
        margin-left: 30px;
        color: #ffffff !important;
        font-weight: 600;
        font-size: 40px;
      }
      .logo:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
      .h3 {
        font-size: 30px;
        font-weight: bolder;
        color: #038cfe;
      }
      .linkToVote {
        font-size: 1.5rem;
        margin-top: -5%;
        margin-bottom: 10%;
      }

      @media screen and (max-width: 800px) {
        .headLine {
          background-color: #038cfe;
          width: 100vw; /* The width is 100%, when the viewport is 800px or smaller */
        }
      }
    </style>
  </head>
  <body
    class="clean-body u_body"
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #ffffff;
      color: #000000;
    "
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
      style="
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        vertical-align: top;
        min-width: 320px;
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
      "
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td
            style="
              word-break: break-word;
              border-collapse: collapse !important;
              vertical-align: top;
            "
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 550px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: #038cfe;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #038cfe;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 550px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div style="width: 100% !important">
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_image_1"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 0px;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        class="headLine"
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                          /* background-color: #2b2b2b; */
                                        "
                                        align="center"
                                      >
                                        <h3 class="logo">EZPoll</h3>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class="u-row-container"
              style="padding: 0px; background-color: transparent"
            >
              <div
                class="u-row"
                style="
                  margin: 0 auto;
                  min-width: 320px;
                  max-width: 550px;
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  word-break: break-word;
                  background-color: transparent;
                "
              >
                <div
                  style="
                    border-collapse: collapse;
                    display: table;
                    width: 100%;
                    background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');
                    background-repeat: no-repeat;
                    background-position: center top;
                    background-color: transparent;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class="u-col u-col-100"
                    style="
                      max-width: 320px;
                      min-width: 550px;
                      display: table-cell;
                      vertical-align: top;
                    "
                  >
                    <div
                      style="
                        width: 100% !important;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style="
                          padding: 0px;
                          border-top: 0px solid transparent;
                          border-left: 0px solid transparent;
                          border-right: 0px solid transparent;
                          border-bottom: 0px solid transparent;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      ><!--<![endif]-->
                        <table
                          id="u_content_image_4"
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 50px 10px 25px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <table
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  border="0"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          align="center"
                                          border="0"
                                          src="https://cdn.templates.unlayer.com/assets/1636374086763-hero.png"
                                          alt="Hero Image"
                                          title="Hero Image"
                                          style="
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            clear: both;
                                            display: inline-block !important;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 54%;
                                            max-width: 286.2px;
                                          "
                                          width="286.2"
                                          class="v-src-width v-src-max-width"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 10px 20px 5px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <h2
                                  style="
                                    margin: 0px;
                                    color: #141414;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                    font-weight: normal;
                                    font-family: 'Open Sans', sans-serif;
                                    font-size: 28px;
                                  "
                                >
                                  <strong
                                    >Your OTP is
                                    <span class="h3">${secretToken}</span>
                                  </strong>
                                </h2>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 10px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              ></td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 15px 10px 12px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <h1
                                  style="
                                    margin: 0px;
                                    color: #3b4d63;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                    font-weight: normal;
                                    font-family: arial, helvetica, sans-serif;
                                    font-size: 41px;
                                  "
                                >
                                  <strong>
                                    <br />
                                    <div class="linkToVote">
                                      You are voting for :
                                      ${registrationNumber.name}
                                    </div>
                                  </strong>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family: arial, helvetica, sans-serif"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="v-container-padding-padding"
                                style="
                                  overflow-wrap: break-word;
                                  word-break: break-word;
                                  padding: 0px 10px 117px;
                                  font-family: arial, helvetica, sans-serif;
                                "
                                align="left"
                              >
                                <div
                                  style="
                                    color: #2b2b2b;
                                    line-height: 140%;
                                    text-align: center;
                                    word-wrap: break-word;
                                  "
                                >
                                  <p style="font-size: 14px; line-height: 140%">
                                    <span
                                      style="
                                        font-size: 18px;
                                        line-height: 25.2px;
                                      "
                                      ><strong
                                        ><span
                                          class="footr"
                                          style="
                                            /* font-family: Lato, sans-serif; */
                                            line-height: 25.2px;
                                            font-size: 18px;
                                          "
                                          >This is an auto generated email.
                                          Please do not reply to this.</span
                                        ></strong
                                      ></span
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
</html>



        `,
      });
    } else if (mode == "PasswordReset") {
      return await transport.sendMail({
        from: "ezpoll.india@gmail.com",
        to: email,
        subject: "Reset link",
        html: `
      your link is ${secretToken}
        `,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = sendMail;
