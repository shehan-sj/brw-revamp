// Site footer (colophon).
import { LOGO, SOCIAL } from './shared.mjs'

export function renderFooter() {
  return `
<footer class="colophon">
  <div class="container">
    <div class="colophon-grid">
      <div class="colophon-brand">
        ${LOGO}
        <p class="colophon-tag">Canada's transport-truck advertising company. Turning highways into high-impact marketing since 2013.</p>
        <div class="colophon-social">${SOCIAL}</div>
      </div>
      <div class="colophon-col"><h5>Services</h5>
        <a href="./transport-truck.html">Transport Truck Ads</a><a href="./fleet-graphics.html">Fleet Graphics</a><a href="./custom-signs.html">Custom Signs</a><a href="./ooh-advertising.html">OOH Advertising</a></div>
      <div class="colophon-col"><h5>Company</h5>
        <a href="./about.html">About Us</a><a href="./agencies.html">For Agencies</a><a href="./fleet-partner.html">Fleet Partners</a><a href="./sustainability.html">Sustainability</a></div>
      <div class="colophon-col"><h5>Explore</h5>
        <a href="./projects.html">Projects</a><a href="./testimonials.html">Testimonials</a><a href="./charities.html">Charities &amp; NPOs</a><a href="./news.html">News</a></div>
      <div class="colophon-col colophon-contact"><h5>Get in touch</h5>
        <a class="colophon-phone" data-tel><span class="tel-out"></span></a>
        <a class="btn btn-outline btn-sm" href="./quote.html">Request a Quote</a></div>
    </div>
    <div class="colophon-base">
      <p>&copy; 2026 Big Rig Wraps Transport Truck Advertising. All rights reserved.</p>
      <nav><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></nav>
    </div>
  </div>
</footer>`
}
