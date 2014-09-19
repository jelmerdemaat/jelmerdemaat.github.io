---
layout: page
title: Adventures | Jelmer de Maat
navtitle: Adventures
permalink: /adventures/
weight: 2
---

## Places I've been

{% for post in site.categories['adventure']  %}

  {% include post-frontpage.htm %}

{% endfor %}