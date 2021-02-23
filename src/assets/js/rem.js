(function(a, b) {
  // 页面自适应脚本
  let c = a.documentElement
  let d = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let e = window.recalc = function() {
    let a = c.clientWidth
    if (a) {
      let fontsize = Math.floor(100 * (a / 1920))
      if (fontsize < 50) {
        fontsize = 50
      }
      if (fontsize >= 100) {
        fontsize = 100
      }
      c.style.fontSize = fontsize + 'px'
    }
  }
  a.addEventListener && (b.addEventListener(d, e, !1), a.addEventListener('DOMContentLoaded', e, !1))
})(document, window)
