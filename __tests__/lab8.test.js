import { ConsoleMessage } from "puppeteer";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    //await page.waitForNavigation();
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000); 

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.$eval('journal-entry', (entry) => {
      entry.click();
    });
    let url = await page.url();
    expect(url.includes('/#entry1')).toBe(true);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    
    await page.$eval('journal-entry', (entry) => {
      entry.click();
    });
    await page.waitForTimeout(500);
    const text = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    console.log(text);
    expect(text).toBe('Entry 1');
  }, 10000);

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        } comment ends here boy*/
      
      
      const entry = await page.$('journal-entry');
      let data = await entry.getProperty('entry');
      const content = await data.jsonValue();
      
      console.log(content);
      expect(content).toEqual({ 
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      });

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    await page.$eval('journal-entry', (entry) => {
      entry.click();
    });
    await page.waitForTimeout(500);
    const name = await page.$eval('body', (body) => {
      return body.className;
    });
    console.log(name);
    expect(name).toBe('single-entry');
  }, 10000);

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img',{alt: 'settings'});
    
    let url = await page.url();
    console.log(url);
    expect(url.includes('/#settings')).toBe(true);
  }); 

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.click('img',{alt: 'settings'});

    await page.waitForTimeout(500);
    const name = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    console.log(name);
    expect(name).toBe('Settings');

  }, 10000);

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    await page.click('img',{alt: 'settings'});
    await page.waitForTimeout(500);
    const name = await page.$eval('body', (body) => {
      return body.className;
    });
    console.log(name);
    expect(name).toBe('settings');
  }, 10000);

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.$eval('journal-entry', (entry) => {
      entry.click();
    });
    await page.waitForTimeout(500);

    await page.click('img',{alt: 'settings'});
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);
    
    let url = await page.url();
    console.log(url);
    expect(url.includes('/#entry1')).toBe(true);
  }, 30000); 

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.$eval('journal-entry', (entry) => {
      entry.click();
    });
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    let url = await page.url();
    console.log(url);
    expect(url).toBe('http://127.0.0.1:5500/');
  }, 30000);


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const name = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    console.log(name);
    expect(name).toBe('Journal Entries');
  }, 10000);


  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('test13: On the home page the <body> element should not have any class attribute', async() => {
    const name = await page.$eval('body', (body) => {
      return body.className;
    });
    console.log(name);
    expect(name).toBe('');
  }, 10000); 


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.$$eval('journal-entry', (entries) => {
      return entries[1].click();
    });

    await page.waitForTimeout(500);

    let url = await page.url();
    console.log(url);
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
    
    
  }, 30000); 


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    await page.$$eval('journal-entry', (entries) => {
      return entries[1].click();
    });

    await page.waitForTimeout(500);

    const name = await page.$eval('entry-page', (entry) => {
      return entry.shadowRoot.querySelector('h2').innerText;
    });
    console.log(name);
    expect(name).toBe('Run, Forrest! Run!');
  }, 30000); 


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry


  // create your own test 17

  // create your own test 18

  // create your own test 19

  // create your own test 20
  
});
