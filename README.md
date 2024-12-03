# yt-subscriber.js 🤖📺

simple javascript script to perform a batch subscription process

###### Last update: 12/2024

**DISCLAIMER:** This script relies on the content and structure of the YouTube website.  As the site is dynamic, this script may stop working if YouTube changes its layout. It is provided "as is" without warranty of any kind.

### Usage

1 - Open the browser and open the youtube account that will be subscribed to the list of channels

2 - Open the browser's console.

3 - Paste the function in the console

4 - Paste the list of URLs:

```
    const urls = [
      "https://www.youtube.com/channel/channel_ID_1",
      "https://www.youtube.com/channel/channel_ID_2",
      // ... 
    ];
```

5 - Trigger the function

```
    handleSubscriptions(urls, "subscribe"); //to subscribe
    handleSubscriptions(urls, "unsubscribe"); //to unsubscribe
```

6 - See the magic :)