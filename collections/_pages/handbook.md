---
layout: page
title: Community Handbook
permalink: /community/handbook
description: Your guide to being an active Meshery community member!
---

<div class="meshery-card-grid">

  <div class="meshery-card" onclick="location.href='/community/recognition'">
    <div class="meshery-card-notch">
      <img src="/assets/images/nav-icons/Recognition.svg" alt="Recognition" />
    </div>
    <div class="meshery-card-body">
      <div class="meshery-card-title">Recognition Program</div>
      <div class="meshery-card-desc">
        Earn badges and get recognized for your Meshery contributions! Visit the Recognition page to learn more.
      </div>
    </div>
  </div>

</div>
<style>

.meshery-card-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(0, 285px));
gap: 2.2rem;
margin: 2.2rem 0 3.2rem 0;
}

.meshery-card {
position: relative;
border-radius: 2rem;
background: linear-gradient(135deg, #184140 0%, #00e7cb 100%);
box-shadow: 0 4px 28px 0 #00b39f22, 0 1.5px 8px #0003;
color: #fff;
min-height: 185px;
padding: 2.1rem 1.25rem 1.25rem 1.25rem;
cursor: pointer;
overflow: visible;
display: flex;
align-items: flex-start;
transition:
box-shadow 0.26s cubic-bezier(.28,1.36,.71,.96),
transform 0.22s cubic-bezier(.48,1.23,.49,.96),
background 0.28s;
}
.meshery-card:hover, .meshery-card:focus-within {
background: linear-gradient(135deg, #00e7cb 10%, #184140 100%);
box-shadow: 0 12px 42px #00b39f55, 0 5px 24px #0005;
transform: translateY(-8px) scale(1.037);
z-index: 2;
}

.meshery-card-notch {
position: absolute;
top: 0;
left: 0;
width: 62px;
height: 62px;
background: #00b39f;
border-radius: 2rem 0 2rem 0;
display: flex;
align-items: center;
justify-content: center;
transform: translate(-15%, -15%);
box-shadow: 0 4px 18px #00b39f44;
z-index: 4;
}
.meshery-card-notch img {
width: 34px;
height: 34px;
filter: drop-shadow(0 0 7px #fff8) brightness(1.19);
transition: filter 0.26s, transform 0.22s;
}

.meshery-card:hover
.meshery-card:focus-within .meshery-card-notch img {
filter: drop-shadow(0 0 16px #fff) brightness(2.2);
transform: scale(1.13) rotate(-10deg);
}

.meshery-card-body {
margin-left: 58px;
margin-top: 12px;
flex: 1;
min-width: 0;
}
.meshery-card-title {
font-size: 1.15rem;
font-weight: 700;
color: #fff;
}
.meshery-card-desc {
font-size: 1rem;
color: #d1fff8;
}

</style>
