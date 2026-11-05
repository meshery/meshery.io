---
layout: page
title: Community Leaderboard
permalink: /community/leaderboard/
redirect_from:
  - /community/leaderboard
---

<h1 class="leaderboard-heading">Community Leaderboard</h1>

<p id="leaderboard-description">Celebrating the top contributors on the <a href="https://discuss.meshery.io">Meshery discussion forum</a> <span id="leaderboard-period-phrase">{% case site.data.leaderboard.default_period %}{% when 'monthly' %}over the past 30 days{% when 'yearly' %}over the past year{% when 'all' %}across all time{% else %}over the past 7 days{% endcase %}</span>. Members earn their spot by staying active — a post is worth a point, a like from a fellow member is worth two, and an answer accepted as the solution is worth three. See who leads across different periods.</p>

{% include leaderboard.html %}
