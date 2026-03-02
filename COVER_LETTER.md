Hi,

Facebook's DOM changes weekly — hardcoded selectors are the wrong foundation for automation that needs to stay running. Built a more resilient approach for your inventory posting flow: https://full-throttle-demo.vercel.app

The demo covers selector-resilient form filling, exponential backoff on retries, and branching logic for motorcycle vs. powersport form variants — the fragility points you named.

I've also built an eBay listing monitor that fires sub-minute Discord alerts. Keeping automation alive across platform changes is where most of that time went.

When the CAPTCHA challenge fires, does your flow abort and require manual intervention, or is there a session-persistence fallback you're building around?

10-minute call or I can scope the hardening work in a doc — your pick.

Humam
