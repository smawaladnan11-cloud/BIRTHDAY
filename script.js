const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const WISH = 'Ur officially 15!! 🎈I hope this yr brings u everything u wish for nd more🌀Wishing you the absolute best, always 🤍<br><br>P.s u got gr8 style nd an evn awesome personality:)';

// bunting flags
$('#bunt').innerHTML = '<span></span>'.repeat(14);

// floating balloons
const BC = ['#ff5fa8','#8f7bff','#ffd84d','#3fe0d0','#ff8a5c','#b6f04a','#ff5fa8'];
$('#bls').innerHTML = BC.map((c, i) =>
  `<i class="bl" style="left:${6 + i * 14}%;background:${c};animation-duration:${14 + i * 2.5}s;animation-delay:${-i * 3}s"></i>`
).join('');

// five lit candles
function build() {
  $('#cs').innerHTML = '<button class="c" onclick="whoosh();out(this)" aria-label="Blow out candle"><span class="f"></span><span class="s">💨</span></button>'.repeat(5);
}

function confetti() {
  popper();
  const c = ['🎀','✨','🌸','💖','🎉','💜','🎂','🎈'];
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.className = 'cf';
    s.textContent = c[i % 8];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = 14 + Math.random() * 18 + 'px';
    s.style.animationDelay = Math.random() * .7 + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3600);
  }
}

function out(c) {
  if (c.classList.contains('out')) return;
  c.classList.add('out');
  if (!$$('.c:not(.out)').length) finish();
}

function blow() {
  whoosh();
  const l = $$('.c:not(.out)');
  l.slice(0, Math.ceil(l.length / 2)).forEach(out);
}

function finish() {
  $('#ctl').hidden = true;
  $('#t').textContent = 'HAPPY BIRTHDAY, Hifza! 🥳';
  $('#done').classList.add('on');
  confetti();
}

// bouquet
function flower(x, y, r, c, d) {
  let p = '';
  for (let i = 0; i < 6; i++)
    p += `<ellipse cx="${x}" cy="${y - r}" rx="${r * .55}" ry="${r}" fill="${c}" transform="rotate(${i * 60} ${x} ${y})"/>`;
  return `<g class="fl" style="animation-delay:${d}s">${p}<circle cx="${x}" cy="${y}" r="${r * .4}" fill="#ffd36b"/></g>`;
}

function bouquet() {
  const F = [
    [100,48,20,'#ff5fa8',.2], [62,72,17,'#8f7bff',.4], [138,72,17,'#ffd84d',.55],
    [84,98,15,'#ff8a5c',.7],  [118,98,15,'#3fe0d0',.85], [100,78,13,'#fff',.95]
  ];
  return `<svg class="bq" viewBox="0 0 200 230" aria-label="A bouquet of flowers">
    <g stroke="#7cb98a" stroke-width="4" stroke-linecap="round">${F.map(f => `<line x1="${f[0]}" y1="${f[1]}" x2="100" y2="165"/>`).join('')}</g>
    <ellipse cx="72" cy="128" rx="16" ry="7" fill="#8fcf9c" transform="rotate(-30 72 128)"/>
    <ellipse cx="128" cy="128" rx="16" ry="7" fill="#8fcf9c" transform="rotate(30 128 128)"/>
    ${F.map(f => flower(...f)).join('')}
    <polygon points="52,132 148,132 100,222" fill="#ff5fa8"/>
    <polygon points="52,132 100,222 78,132" fill="#8f7bff" opacity=".9"/>
    <path d="M100 160 q-26 -20 -20 -6 q-10 14 20 6 q30 8 20 -6 q6 -14 -20 6z" fill="#e07aa3"/>
    <circle cx="100" cy="160" r="5" fill="#c9578a"/>
  </svg>`;
}

function openGift() {
  $('#gb').style.display = 'none';
  $('#gn').innerHTML = bouquet() + '<div class="note">' + WISH + '</div>';
}

// sound effects (generated with the Web Audio API, no audio files needed)
let ac;
function AC() {
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  if (ac.state === 'suspended') ac.resume();
  return ac;
}

// "Tap to blow" whoosh
function whoosh() {
  try {
    const a = AC(), n = a.sampleRate * .7, b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = a.createBufferSource(); s.buffer = b;
    const f = a.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .8;
    f.frequency.setValueAtTime(500, a.currentTime);
    f.frequency.exponentialRampToValueAtTime(2200, a.currentTime + .5);
    const g = a.createGain();
    g.gain.setValueAtTime(.001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(.5, a.currentTime + .15);
    g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .65);
    s.connect(f); f.connect(g); g.connect(a.destination); s.start();
  } catch (e) {}
}

// party-popper pop + sparkles for the confetti
function popper() {
  try {
    const a = AC(), t = a.currentTime, n = a.sampleRate * .25, b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    const s = a.createBufferSource(); s.buffer = b;
    const g = a.createGain(); g.gain.value = .9;
    s.connect(g); g.connect(a.destination); s.start(t);
    for (let i = 0; i < 14; i++) {
      const o = a.createOscillator(), e = a.createGain(), st = t + .12 + i * .09 + Math.random() * .05;
      o.type = 'triangle'; o.frequency.value = 1200 + Math.random() * 2200;
      e.gain.setValueAtTime(.001, st);
      e.gain.exponentialRampToValueAtTime(.12, st + .01);
      e.gain.exponentialRampToValueAtTime(.001, st + .25);
      o.connect(e); e.connect(a.destination); o.start(st); o.stop(st + .3);
    }
  } catch (e) {}
}

build();
