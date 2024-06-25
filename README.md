```
property passing: https://www.smashingmagazine.com/2020/01/data-components-vue-js/#emitting-custom-events-share-data-child-parent

Chat App: https://www.scaledrone.com/blog/vue-real-time-chat-tutorial/
Chat Bot: https://www.toolify.ai/ai-news/create-an-ai-chatbot-using-vuejs-nodejs-and-openai-1662147
```


```
how to run:
npm install -g pnpm
pnpm i
pnpm dev
```
```
state management:
1. pinia
```
```
1. print ref object:  console.log(`cookie: ${JSON.stringify(cookie.value, null, 2)}`);
 2. print normal object: console.log(`payload: ${JSON.stringify(payload, null, 2)}`);

```

```

topnavbar is a combination of:
1.  AccAccountMenu
2. AccToolbarCustomize
3. AccToolbarNotifications
4. AccToolbarSearch
5. AccTopnavWorkspaceDropdown
we need to create a new topnavbar for landing page.

```
```

attach style="border: 1px solid red;" with div to test occupied area.
```

```
code snippet for server folder:
1. getRequestUrl for getting current route.
2. sendRedirect is working like router.push.

export default defineEventHandler(async (event) => {
  console.log('New request: ' + getRequestURL(event))
  await sendRedirect(event, '/', 302)
})

```

```
AccSubsidebarLayout is changed in a way do not know whats its imapct. need to check it.

```

```
tawk.to chatbot:
https://github.com/tawk/tawk-messenger-vue-3
pnpm i @tawk.to/tawk-messenger-vue-3
making the plugin enables tawk.to. this does not need code anywhere else.

```

```
pusher: 
https://github.com/akserikawa/nuxt-pusher
```
