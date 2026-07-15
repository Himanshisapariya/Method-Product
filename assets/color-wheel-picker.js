/**
 * Color Wheel Picker
 * Drag/tap anywhere on the wheel to pick a hue. The nearest matching
 * product swatch (by data-hue) is highlighted and scrolled into view,
 * and the "your happy place is: ___" label updates to match.
 */
(function () {
  function initColorWheel(section) {
    var wheel = section.querySelector('[data-color-wheel]');
    var handle = section.querySelector('[data-color-wheel-handle]');
    var label = section.querySelector('[data-color-wheel-label]');
    var track = section.querySelector('[data-color-wheel-track]');
    var prevBtn = section.querySelector('[data-color-wheel-prev]');
    var nextBtn = section.querySelector('[data-color-wheel-next]');
    var cards = Array.prototype.slice.call(section.querySelectorAll('[data-color-wheel-card]'));

    if (!wheel || !handle || !cards.length) return;

    var dragging = false;

    function angleToPoint(angleDeg, radius) {
      // 0deg = top (north), clockwise positive — matches conic-gradient "from 0deg"
      var rad = (angleDeg - 90) * (Math.PI / 180);
      return {
        x: radius + radius * Math.cos(rad),
        y: radius + radius * Math.sin(rad)
      };
    }

    function pointToAngle(x, y, cx, cy) {
      var dx = x - cx;
      var dy = y - cy;
      var deg = Math.atan2(dx, -dy) * (180 / Math.PI);
      if (deg < 0) deg += 360;
      return deg;
    }

    function hueDiff(a, b) {
      var d = Math.abs(a - b) % 360;
      return d > 180 ? 360 - d : d;
    }

    function closestCard(hue) {
      var best = null;
      var bestDiff = Infinity;
      cards.forEach(function (card) {
        var cardHue = parseFloat(card.getAttribute('data-hue')) || 0;
        var diff = hueDiff(hue, cardHue);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = card;
        }
      });
      return best;
    }

    function setActiveCard(card) {
      cards.forEach(function (c) {
        var isActive = c === card;
        c.classList.toggle('scale-105', isActive);
        c.classList.toggle('opacity-100', true);
        var link = c.querySelector('a');
      });
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        if (label) {
          label.textContent = card.getAttribute('data-label') || label.textContent;
        }
      }
    }

    function updateFromClientPoint(clientX, clientY) {
      var rect = wheel.getBoundingClientRect();
      var radius = rect.width / 2;
      var cx = rect.left + radius;
      var cy = rect.top + radius;

      var dx = clientX - cx;
      var dy = clientY - cy;
      var dist = Math.min(Math.sqrt(dx * dx + dy * dy), radius);
      var angle = pointToAngle(clientX, clientY, cx, cy);

      var handlePoint = angleToPoint(angle, dist);
      handle.style.left = handlePoint.x + 'px';
      handle.style.top = handlePoint.y + 'px';

      var hue = angle;
      var match = closestCard(hue);
      setActiveCard(match);
    }

    function pointerDown(e) {
      dragging = true;
      wheel.setPointerCapture && wheel.setPointerCapture(e.pointerId);
      updateFromClientPoint(e.clientX, e.clientY);
    }

    function pointerMove(e) {
      if (!dragging) return;
      updateFromClientPoint(e.clientX, e.clientY);
    }

    function pointerUp() {
      dragging = false;
    }

    wheel.addEventListener('pointerdown', pointerDown);
    wheel.addEventListener('pointermove', pointerMove);
    wheel.addEventListener('pointerup', pointerUp);
    wheel.addEventListener('pointercancel', pointerUp);
    wheel.addEventListener('pointerleave', function () {
      if (!dragging) return;
    });

    // keyboard support (left/right arrows nudge hue)
    var currentHue = 280;
    wheel.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      currentHue += e.key === 'ArrowRight' ? 10 : -10;
      currentHue = ((currentHue % 360) + 360) % 360;
      var rect = wheel.getBoundingClientRect();
      var radius = rect.width / 2;
      var p = angleToPoint(currentHue, radius * 0.85);
      handle.style.left = p.x + 'px';
      handle.style.top = p.y + 'px';
      setActiveCard(closestCard(currentHue));
    });

    if (prevBtn && track) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -260, behavior: 'smooth' });
      });
    }
    if (nextBtn && track) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: 260, behavior: 'smooth' });
      });
    }
  }

  function initAll() {
    document.querySelectorAll('[id^="color-wheel-"][data-section-id]').forEach(initColorWheel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Shopify theme editor support
  document.addEventListener('shopify:section:load', function (e) {
    var section = e.target.querySelector('[data-section-id]') || e.target;
    if (section) initColorWheel(section);
  });
})();
