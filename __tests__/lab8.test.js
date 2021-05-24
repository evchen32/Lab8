import { ConsoleMessage } from "puppeteer";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
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
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    let url = await page.url();
    expect(url.includes('/#entry1')).toBe(true);

  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    const text = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    
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
        } */
      
      const entry = await page.$('journal-entry');
      let data = await entry.getProperty('entry');
      const content = await data.jsonValue();
      

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
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    const name = await page.$eval('body', (body) => {
      return body.className;
    });
    
    expect(name).toBe('single-entry');
  }, 10000);

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('img',{alt: 'settings'});
    
    let url = await page.url();
    
    expect(url.includes('/#settings')).toBe(true);
  }, 10000); 

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('img',{alt: 'settings'});

    await page.waitForTimeout(500);
    const name = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    
    expect(name).toBe('Settings');

  }, 10000);

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('img',{alt: 'settings'});
    await page.waitForTimeout(500);

    const name = await page.$eval('body', (body) => {
      return body.className;
    });

    
    expect(name).toBe('settings');
  }, 10000);

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    await page.click('img',{alt: 'settings'});
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);
    
    let url = await page.url();
    
    expect(url.includes('/#entry1')).toBe(true);
  }, 30000); 

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    let url = await page.url();
    
    expect(url).toBe('http://127.0.0.1:5500/');
  }, 30000);


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const name = await page.$eval('h1', (header) => {
      return header.innerText;
    });
    
    expect(name).toBe('Journal Entries');
  }, 10000);


  // define and implement test13: On the home page the <body> element should not have any class attribute
  it('test13: On the home page the <body> element should not have any class attribute', async() => {
    const name = await page.$eval('body', (body) => {
      return body.className;
    });
    
    expect(name).toBe('');
  }, 10000); 


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(500);

    let url = await page.url();
    
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  }, 30000); 


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(500);

    const name = await page.$eval('entry-page', (entry) => {
      return entry.shadowRoot.querySelector('h2').innerText;
    });
    
    expect(name).toBe('Run, Forrest! Run!');
  }, 30000); 


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let allEntries = await page.$$('journal-entry');
    await allEntries[1].click();
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');

    let data = await entries[1].getProperty('entry');
    const content = await data.jsonValue();
    
    expect(content).toEqual( 
      {title: "Run, Forrest! Run!",
      date: "4/26/2021",
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: { alt: "forrest running",
      src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg"}});
  }, 30000); 


  // create your own test 17
  it('Test17: Clicking the forward button once should bring the user back to Entry 1', async() => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    await page.click('journal-entry');
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    await page.goForward();
    await page.waitForTimeout(500);

    let url = await page.url();
    
    expect(url.includes('/#entry1')).toBe(true);
  }, 50000);

  // create your own test 18
  it('test18: Verify the title is correct when clicking on the last entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');
    await entries[entries.length - 1].click();

    await page.waitForTimeout(500);

    const name = await page.$eval('entry-page', (entry) => {
      return entry.shadowRoot.querySelector('h2').innerText;
    });
    
    expect(name).toBe('No, I am your father');
  }, 50000);

  // create your own test 19
  it('test19: Verify the date is correct when clicking on the last entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');
    await entries[entries.length - 1].click();

    await page.waitForTimeout(500);

    const date = await page.$eval('entry-page', (entry) => {
      return entry.shadowRoot.querySelector('p').innerText;
    });
    
    expect(date).toBe('5/4/2021');
  }, 50000);

  // create your own test 20
  it('test20: Verify the post content is correct when clicking on the last entry', async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);

    let entries = await page.$$('journal-entry');
    await entries[entries.length - 1].click();

    await page.waitForTimeout(500);

    const content = await page.$eval('entry-page', (entry) => {
      return entry.shadowRoot.querySelectorAll('p')[1].innerText;
    });
    expect(content).toBe("A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....");
  }, 50000);
  
});
