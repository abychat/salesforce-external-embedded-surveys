# Salesforce Embedded Survey Example

This app provides an easy way to demonstrate how to embed Salesforce Surveys in a third party website using an iFrame.

The app allows you to quickly spin up a web app with a fake background that would typically be a screengrab of the third party website where the customer wants to embed a survey. (inspired by Frank Caron's External Identity demo!)

The survey appears in a floating button on the bottom right corner of the screen that opens a modal that displays the survey when clicked. You can control the look and feel of the button, the button text and the height of the modal via config vars for the Heroku App.

# Disclaimer
Currently best demoed on a desktop, laptop or tablet

# Heroku Button
Deploy the app by clicking this button
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

A live example of the app can be seen @ https://ac-embedded-surveys.herokuapp.com/
![image](https://user-images.githubusercontent.com/7586106/120673946-7b48f380-c448-11eb-8240-22efa380102a.png)

# Prerequisites

- Salesforce Feedback Management License provisioned in your org
- An active survey to be displayed on the website
- A Heroku account
- A Connected app with a digital certificate & Private key if you want to generate unique invitations for a contact and track their responses
- For the best experience, limit the number of survey questions on each page to 1 or maximum 2.

# Mobile Support

- This app can be demoed from Desktop, Tablets and Mobile Phones.
- Tested on iPad Pro (10.5 inch - best demoed in Landscapre orientation), iPhone XS and Samasung Galaxy S10(best demoed in Portrait for both).
- **NOTE** - Smartphone Demo - Please supply an image for the **BG_FAKE_MOBILE** config var if you are planning to demo from mobile phone. The app will automatically switch between images for desktop and mobile based on form factor.

**[Add the URL of the website that hosts the survey as a trusted website.](https://help.salesforce.com/articleView?id=task_chat_trusted_site.htm&type=5)**

# Required Configuration Variables for the Heroku App

1. **BG_FAKE** - The URL for the image of the Fake website background. The image URL should be publically accessible.
2. **BUTTON_CLASS** - The Bootstrap class for the button color - Choose one of btn-primary btn-secondary btn-success btn-warning btn-success btn-danger btn-warning btn-info btn-light btn-dark btn-link
3. **BUTTON_TEXT** - The label for the Floating Feedback Button.
4. **MODAL_HEIGHT** - The height of the Feedback Modal
5. **IFRAME_HEIGHT** - The height of the Iframe within the Modal (recommended to be -50 of MODAL HEIGHT)
6. **SURVEY_HAS_CONTACT** - Value that indicates whether the Survey is an Individual Survey or a generic survey. Valid values are YES or NO.
7. **SURVEY_URL** - The URL for the survey if the value for **6** is NO.
8. Follow the instructions in the rest of the README file if the answer to **6** is **YES**.

# Tips for Hosting High Quality Background Images

- [Install the Go Full Page Screen Capture Chrome Extension](https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl?hl=en)
- Use the tool to take full screen capture for laptop/desktop as well as in [mobile responsive view using Chrome Developer Tools](https://developer.chrome.com/docs/devtools/device-mode/) if you want to demo from a phone.
- Upload both the pictures to your Google Photos account (work or personal).
- Follow the instructions here to generate a URL for each Google Photo that can be used for the BG_FAKE and BG_FAKE_MOBILE config vars. Use only the value of the **src** attribute of the **img** tag (without the "") from the generated embed code. For example a generated code on the website could look like the following. 
```
<a href="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w2400?source=screenshot.guru"> 
<img src="https://lh3.googleusercontent.com/2Fz6Fn5zq_hh75oNLsyNqyGSHzPopHojN77Eu6GImw_3bb4JteONR_K8lnCY2nRbZQV9RD7ACVYvTHEEoW6oGt2GNkAVXzsGdHl1XI9JWwr9ojo3N7t5mYgqaux8lESdvi4mJTti4Ok=w600-h315-p-k" /> </a>
```
# FOLLOW THESE STEPS IF YOU WANT TO GENERATE INDIVIDUAL SURVEYS FOR CONTACTS

# Salesforce Connected App Set Up for Individual Surveys

When distributing surveys, you can use a generic survey link for external participants and not require authentication or you can generate an individual link for a survey that is associated with a contact record. The app supports both scenarios.

Survey Links generated for individual contacts typically involves the survey being distributed via email or the survey being delivered in a Salesforce experience where the custome is logged in. Given that this is a third party website, a survey link is generated dynamically via an API call to a custom apex service and dynamically supplied to the iframe.

COMPLETE THE FOLLOWING STEPS IF YOU PLAN ON USING INDIVIDUAL SURVEYS FOR A CONTACT

[Generate a digital certificate and private key by following the instructions](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm)

Once you have generated the ceritifcate and private key set up the connect up by following these steps

1. From Setup, enter App Manager in the Quick Find box to get to the Lightning Experience App Manager.
2. In the top-right corner, click New Connected App.
3. Update the basic information as needed, such as the connected app name and your email address.
4. Select Enable OAuth Settings.
5. For the callback URL, enter a fake URL like http://<your heroku app>/OauthRedirect.
6. Select Use digital signatures.
7. Click Choose File and upload the server.crt file that contains your digital certificate.
8. Add these OAuth scopes:
   - Access and manage your data (api)
   - Perform requests on your behalf at any time (refresh_token, offline_access)
   - Provide access to your data via the Web (web)
   - Full Access
9. Click Save.
10. Click Manage.
11. Click Edit Policies.
12. In the OAuth Policies section, select Admin approved users are pre-authorized for permitted users, and click OK.
13. Relax IP restrictions and Refresh Token policies.
14. Click Save.
15. Click Manage Profiles and/or click Manage Permission Sets. Select the profiles and permission sets that are pre-authorized to use this connected app. Create permission sets if necessary.

# Install Apex Service for generating the Individual Survey Link

[Apex Service Package](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5e0000005htQAAQ)

# Additional Configuration Variables for the Heroku App

1. **CLIENT_ID** - Consumer Key from the Connected App
2. **COMMUNITY_ID** - The Id of the Community to which the individual survey link will be tied to.
3. **CONTACT_ID** - The Id of the Contact Record to which the Feedback must be related.
4. **LOGIN_URL** - The Login URL for the Salesforce org.
5. **PRIVATE_KEY** - The Private KEY for the Ceritifcate used in the Connected App.
6. **SURVEY_ID** - The Id of the Survey for which an individual survey link has to be generated.
7. **USERNAME** - The user name of the Salesforce integration user or Admin user to make the call to the Apex Service.

An example site tied to the contact Bill Blau can be found here - https://ac-survey-with-contact.herokuapp.com/
