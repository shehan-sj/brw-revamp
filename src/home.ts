import './shared'

// Proximity scroll snap — works with Lenis by calling lenis.scrollTo()
// when the user stops scrolling near a section boundary (~30% of vh).
;(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('section'))
  if (!sections.length) return

  var timer = 0
  var snapping = false

  function snap () {
    var lenis = (window as any).__lenis
    if (!lenis || snapping) return

    var vh = window.innerHeight
    var threshold = vh * 0.3
    var best = null
    var bestDist = Infinity

    for (var i = 0; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top
      var dist = Math.abs(top)
      if (dist < threshold && dist < bestDist) {
        bestDist = dist
        best = sections[i]
      }
    }

    if (best && bestDist > 2) {
      snapping = true
      lenis.scrollTo(best, {
        offset: 0,
        duration: 0.9,
        easing: function (t: number) { return 1 - Math.pow(1 - t, 3) },
        onComplete: function () { snapping = false }
      })
    }
  }

  window.addEventListener('scroll', function () {
    clearTimeout(timer)
    timer = window.setTimeout(snap, 130) as unknown as number
  }, { passive: true })
})()
