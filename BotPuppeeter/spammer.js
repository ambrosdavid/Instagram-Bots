const puppeteer = require('puppeteer');

(async () => {
  // Starting browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Login flow
  await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', 'USERNAME');
  await page.type('input[name="password"]', 'PASSWORD');
  await page.click('button[type="submit"]');

  // Waiting for page to refresh
  await page.waitForNavigation();
  await page.goto('https://www.instagram.com/p/CAFkYBxocZq/');

  // Navigate to post and submitting the comment
    for ( var i = 0; i <60; i++){
    await page.goto('https://www.instagram.com/p/CAFkYBxocZq/');
    await page.waitForSelector('textarea');
    await page.type('textarea', '1');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 40000+(Math.floor(Math.random()*10))));
    await page.goto('https://www.instagram.com/p/CAFkYBxocZq/');
    console.log("i....."+i+"\n");    
        }
    await browser.close();
})();

