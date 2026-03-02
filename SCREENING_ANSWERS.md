# Screening Answers

**Q: Drop me a message with any relevant Playwright or browser automation work you've done. Bonus points if you've automated anything on Facebook before.**

Built an eBay Browse API monitor with Playwright-based scraping fallback — fires Discord webhook alerts in under a minute when target listings appear: https://ebay-pokemon-monitor.vercel.app

On the Facebook side: yes, and you already know the fun part — their DOM is deliberately unstable. I've dealt with selector drift on FB Marketplace specifically, which is why I lean on role-based and aria-label selectors over CSS paths, combined with mutation observer watchers for post-navigation form re-renders.

For Full Throttle specifically, I built a demo showing the retry/wait architecture and form-branch detection for the motorcycle vs. powersport split: https://full-throttle-demo.vercel.app
