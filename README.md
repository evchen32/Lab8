# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

One

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, because sending a message means that there will probably be components that will be interacting with each other on a application/feature level that cannot be tested through unit testing. You have many moving parts in this feature such as writing the message, sending the message, and receiving the message.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes, because we are debugging on a small scale without many moving parts by just making sure "max message length" is not exceeded.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

We won't be able to see how Puppeteer drives our browser.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

```javascript
beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.click('img',{alt: 'settings'});
    await page.waitForTimeout(500);  
});
```