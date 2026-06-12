// Single source of truth for client testimonials. Rendered into both the
// dedicated Testimonials page (full grid) and the Home page (auto-rotating
// carousel) by the Vite chrome plugin via the <!--TESTIMONIALS_*--> markers.
export const TESTIMONIALS = [
  { name: 'Jensen Trailers', org: 'Transport & Equipment',
    text: `Big Rig Wraps was fantastic to work with from start to finish. The wrap quality is exceptional and the truck looks incredible on the road. We've gotten so many compliments and the exposure has been phenomenal.` },
  { name: 'The Kidney Foundation', org: 'National Non-Profit',
    text: `The exposure we've gotten from the truck wraps has been tremendous. The Kidney Foundation's mission is reaching people we never could have reached with traditional advertising alone. Big Rig Wraps made it happen.` },
  { name: 'David Hetti', org: 'Business Client',
    text: `We chose Big Rig Wraps because of their professionalism and commitment to quality. Our wrapped trucks are turning heads everywhere they go. Best marketing investment we've made in years.` },
  { name: 'YWCA Durham', org: 'Non-Profit Organization',
    text: `YWCA Durham has been thrilled with the visibility the truck wrap campaign has generated. It's a cost-effective way to spread our message to thousands of people every day. Highly recommend Big Rig Wraps!` },
  { name: `Dr. D's Super 7 Pain Relief`, org: 'Health & Wellness',
    text: `The team at Big Rig Wraps took our vision and turned it into a stunning design that really represents our brand. The whole process was smooth and professional from the quote to the final installation.` },
  { name: 'BACD', org: 'Business Association',
    text: `Working with Big Rig Wraps has been an incredibly positive experience. They understood our needs, delivered on time, and the results speak for themselves. Our brand visibility has increased dramatically.` },
  { name: 'Ramana Shiva', org: 'Client',
    text: `I was amazed at how quickly the team grasped our brand identity and translated it into a wrap design that exceeded our expectations. The truck literally turns heads wherever it goes.` },
  { name: 'Darshan Sritharan', org: 'Client',
    text: `Big Rig Wraps delivered a high-quality product on schedule and at a fair price. The team was communicative, creative, and genuinely cared about getting the wrap right. I couldn't be happier.` },
  { name: 'Sharmila Perera', org: 'Client',
    text: `The investment in a truck wrap with Big Rig Wraps has paid for itself many times over in brand exposure. Our phone has been ringing more since we launched the campaign. Absolutely worth it.` },
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const initial = (s) => esc(s.trim().charAt(0).toUpperCase())

// Full grid for the Testimonials page.
export function renderTestimonialGrid() {
  const delay = ['', ' d2', ' d4']
  return TESTIMONIALS.map((t, i) => `
      <div class="testimonial-card fade-up${delay[i % 3]}">
        <p class="testimonial-text">${esc(t.text)}</p>
        <div class="testimonial-author"><div class="testimonial-avatar">${initial(t.name)}</div><div><div class="testimonial-name">${esc(t.name)}</div><div class="testimonial-org">${esc(t.org)}</div></div></div>
      </div>`).join('\n')
}

// Auto-rotating carousel for the Home page (cycled by chrome.ts).
export function renderTestimonialSlider() {
  const slides = TESTIMONIALS.map((t, i) => `
        <figure class="testi-slide${i === 0 ? ' is-active' : ''}">
          <blockquote class="voice-quote">${esc(t.text)}</blockquote>
          <figcaption class="voice-who"><div class="voice-av">${initial(t.name)}</div><div><b>${esc(t.name)}</b><span>${esc(t.org)}</span></div></figcaption>
        </figure>`).join('')
  const dots = TESTIMONIALS.map((t, i) =>
    `<button class="testi-dot${i === 0 ? ' is-active' : ''}" type="button" aria-label="Show testimonial from ${esc(t.name)}"></button>`).join('')
  return `
    <div class="testi-carousel reveal" data-testi>
      <div class="testi-viewport">${slides}
      </div>
      <div class="testi-dots">${dots}</div>
      <div class="mt-md"><a href="./testimonials.html" class="btn btn-ghost">Read more testimonials <svg class="ic-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
    </div>`
}
