'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const video = document.querySelector('#hero-video');
const motionButton = document.querySelector('#motion-toggle');
let motionWanted = !reducedMotion.matches;
let motionRequest = 0;

async function setMotion(play) {
  motionWanted = play;
  const request = ++motionRequest;
  if (!video || !motionButton) return;
  document.body.classList.toggle('motion-paused', !play);
  if (play) {
    const source = video.querySelector('source');
    if (!source.getAttribute('src')) {
      source.src = source.dataset.src;
      video.load();
    }
    try {
      video.muted = true;
      await video.play();
      if (request !== motionRequest) return;
      motionButton.textContent = 'Pause background';
      motionButton.setAttribute('aria-pressed', 'true');
    } catch {
      if (request !== motionRequest) return;
      video.pause();
      document.body.classList.add('motion-paused');
      motionButton.textContent = 'Play background';
      motionButton.setAttribute('aria-pressed', 'false');
    }
  } else {
    video.pause();
    motionButton.textContent = 'Play background';
    motionButton.setAttribute('aria-pressed', 'false');
  }
}
if (hero && video && motionButton) {
  setMotion(!reducedMotion.matches);
  motionButton.addEventListener('click', () => setMotion(video.paused));
  hero.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || document.body.classList.contains('motion-paused')) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    hero.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
  reducedMotion.addEventListener('change', event => setMotion(!event.matches));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (motionWanted) setMotion(true);
  });
  video.addEventListener('error', () => {
    document.body.classList.add('motion-paused');
    motionButton.textContent = 'Video unavailable';
    motionButton.disabled = true;
  });
}

const filters = Array.from(document.querySelectorAll('[data-filter]'));
const cards = Array.from(document.querySelectorAll('[data-category]'));
const count = document.querySelector('.result-count');
function filterCards(category) {
  let visible = 0;
  for (const card of cards) {
    card.hidden = category !== 'All' && card.dataset.category !== category;
    if (!card.hidden) visible++;
  }
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  if (count) count.textContent = `${visible} ${visible === 1 ? 'item' : 'items'} shown`;
}
for (const button of filters) button.addEventListener('click', () => filterCards(button.dataset.filter));
if (filters.length) filterCards('All');

function buildEnquiryMessage(data) {
  const intents = {project:'Discuss a project',workshop:'Register workshop interest',campus:'Host a campus workshop',collaboration:'Explore a collaboration',printing:'Request 3D printing'};
  const topics = {robotics:'Robotics foundations','ai-iot':'AI & connected devices',prototyping:'3D design & prototyping'};
  return ['Hello RoboIITech,', '', `Name: ${data.name.trim()}`, `Role: ${data.audience}`, `Enquiry: ${intents[data.intent] || intents.project}`, data.topic && topics[data.topic] ? `Workshop: ${topics[data.topic]}` : '', data.organisation.trim() ? `Institution: ${data.organisation.trim()}` : '', '', data.message.trim()].filter((line, i, list) => line !== '' || (i > 0 && list[i - 1] !== '')).join('\n');
}
const form = document.querySelector('#enquiry');
if (form) {
  const params = new URLSearchParams(window.location.search);
  for (const key of ['intent', 'topic']) {
    const control = form.elements.namedItem(key);
    if (Array.from(control.options).some(option => option.value === params.get(key))) control.value = params.get(key);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    window.location.href = `https://wa.me/918770353826?text=${encodeURIComponent(buildEnquiryMessage(data))}`;
  });
}
