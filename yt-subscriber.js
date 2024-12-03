// script built by devmunoz @ https://github.com/devmunoz/

async function handleSubscriptions(urls, action) {
  const iframe = document.createElement('iframe');
  
  // Set iframe in front of the page
  iframe.style.position = 'fixed'; 
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.zIndex = '9999';

  document.body.appendChild(iframe);

  for (const url of urls) {
      try {
          iframe.src = url;
          await new Promise(resolve => {
          iframe.onload = () => setTimeout(resolve, 5000);
          });
          const buttonName = (action == "subscribe")?"Subscribe" : "Subscribed"; 

          const button = iframe.contentDocument.evaluate(`//div[contains( text(), '${buttonName}')]`, iframe.contentDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if (action === "unsubscribe") {
              if (button) {
                  button.click();

                  await new Promise(resolve => setTimeout(async () => {
                      const secondaryButton = iframe.contentDocument.evaluate(`//span[contains( text(), 'Unsubscribe')]`, iframe.contentDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                      if (secondaryButton) {
                          secondaryButton.click();
                          await new Promise(resolve2 => setTimeout(() => {
                              const confirmButton = iframe.contentDocument.querySelector('button[aria-label="Unsubscribe"]'); 
                              if (confirmButton) {
                                  confirmButton.click();
                              } else {
                                  button = false;
                                  console.log("Unsubscribe prompted button not found:", url);
                              }
                              resolve2();
                          }, 1000));
                      } else {
                          button = false;
                          console.log("Unsubscribe button not found:", url);
                      }
                      resolve();
                  }, 1000));
              } else {
                  button = false;
                  console.log("Subscribed button not found:", url);
              }
          } else if (action === "subscribe") {
              button.click();
              console.log("Subscribed successfully: ", url);
          }

          if (action === "unsubscribe" && button) {
              console.log("Unsubscribed successfully: ", url);
          } else if ( button === undefined ) {
              console.log(`'${action === "subscribe" ? "Subscribe" : "Subscribed"}'button not found:`, url);
          }
      } catch (error) {
          console.error(`Error processing ${url}:`, error);
      }
  }
}


/*
Usage:

1 - Open the browser and open the youtube account that will be subscribed to the list of channels  

2 - Open the browser's console.

3 - Paste the function in the console

4 - Paste the list of URLs:
  const urls = [
      "https://www.youtube.com/channel/channel_ID_1",
      "https://www.youtube.com/channel/channel_ID_2",
      // ... 
  ];

5 - Trigger the function
  handleSubscriptions(urls, "subscribe"); //to subscribe
  handleSubscriptions(urls, "unsubscribe"); //to unsubscribe


6 - See the magic :)
*/