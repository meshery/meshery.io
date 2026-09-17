---
layout: page
title: Community Leaderboard
permalink: /community/leaderboard/
redirect_from:
  - /community/leaderboard
description: "Recognizing the most active members of the Meshery community, on both the discussion forum and GitHub."
---

<h1 class="leaderboard-heading">Community Leaderboard</h1>

<p id="leaderboard-description">Celebrating the top contributors to the Meshery project <span id="leaderboard-period-phrase">{% case site.data.discuss_leaderboard.default_period %}{% when 'monthly' %}over the past 30 days{% when 'yearly' %}over the past year{% when 'all' %}across all time{% else %}over the past 7 days{% endcase %}</span>. Switch between the <strong>Community</strong> board — ranking <a href="https://discuss.meshery.io">discussion forum</a> activity (1 pt per post, 2 pts per like received, 3 pts per solution accepted) — and the <strong>GitHub</strong> board, ranking development activity across Meshery repositories (3 pts per PR merged, 2 pts per issue opened, 1 pt per PR review). Each board maintains an independent ranking across weekly, monthly, yearly, and all-time periods.</p>

{% include leaderboard.html %}
