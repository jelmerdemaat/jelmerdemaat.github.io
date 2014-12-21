---
layout: page
title: Blog | Jelmer de Maat
navtitle: Blog
permalink: /blog/
weight: 3
---

## Stuff I've written

{% for post in site.categories['blog']  %}

  {% include post-blog.htm %}

{% endfor %}