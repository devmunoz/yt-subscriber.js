// script built by devmunoz @ https://github.com/devmunoz/

async function subscribeToChannels(urls) {
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
        iframe.onload = () => {
          setTimeout(resolve, 5000);
        };
      });

      const subscribeButton = iframe.contentDocument.evaluate("//div[contains(text(), 'Subscribe')]", iframe.contentDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // you may edit this depending on your locale!


      if (subscribeButton) {
          subscribeButton.click();
          console.log("Subscribed to:", url);
      } else {
          console.log("Subscribe button not found:", url);
      }

    } catch (error) {
      console.error("Error processing", url, ":", error);
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
    subscribeToChannels(urls);

6 - See the magic :)
*/