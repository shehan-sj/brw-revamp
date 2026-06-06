import './shared'

// ---- Portfolio filter ----
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll<HTMLElement>('[data-filter]')
  const cards = document.querySelectorAll<HTMLElement>('.portfolio-card')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      const filter = btn.dataset['filter']

      cards.forEach((card) => {
        const tag = card.dataset['tag']
        const show = !filter || filter === 'all' || tag === filter
        card.style.display = show ? '' : 'none'
      })
    })
  })
})
