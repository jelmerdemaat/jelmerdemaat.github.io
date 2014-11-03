---
layout: post
title: Perfectly justified CSS grid technique using inline-block
categories: [blog]
---
<small>(TL;DR - see <a href="http://code.jelmerdemaat.nl/examples/justified-grid-test/" title="Test page" target="_blank">this test page</a> with the final result of what I'm gonna talk about.)</small>

You know these simple horizontal menu's? Just take some <code class="inline">ul &gt; li &gt; a</code>, set the <code class="inline">li</code> to either <code class="inline">float: left</code> or <code class="inline">display: inline-block</code> and it's done. I'm probably not telling you anything new there.

Earlier this year I was tinkering around with such a menu. When you work with a specifically designed navigation, which is almost always the case, you have a graphical style you want to go for. And, if you're somewhat like me, you want it to be as perfect as can be. Let me pose the problem here. Sometimes, you need a menu that is perfectly aligned to both the left <em>and</em> the right. To illustrate this I present this highly scientific visual example of what I mean:

Now, I'm sure there will be a fancy way the new kids do this with CSS3 flexbox layouts, but I'm solving this old style here. Partly to support older browsers, and partly because I know too little about flexbox. The technique I use to solve this can also be called a "hack", as it involves an unintended use of <code class="inline">text-align: justify</code>.


<h3>Justify and display: inline-block</h3>
Let's go over some basics quickly. Block level elements honor "physical" properties like width and height and are characterized by their blocky appearance (i.e. they have auto 100% width and begin a new line). Inline elements go with the flow and follow their place in lines of text. Inline-block elements have something of both worlds: they can be altered in their physical properties, but also follow text flow in their position.

<em>"Duh. Why is this important?"</em>

It means we can (ab)use inline-block elements to form a horizontal navigation bar like the one above. To do this we use the <code class="inline">text-align</code> property of <code class="inline">justify</code>. Using justification on a normal text means it is aligned to the left as well as to the right, like so:

<blockquote class="text-justify">
And I've found that no matter where I am, or who I'm talking to, there's a common theme that emerges. Some will see this as an attempt to justify or excuse comments that are simply inexcusable. They are anxious about their futures, and feel their dreams slipping away; in an era of stagnant wages and global competition, opportunity comes to be seen as a zero sum game, in which your dreams come at my expense.
<cite>Source: <a href="http://obamaipsum.com/" target="_blank">obamaipsum.com</a></cite>
</blockquote>




But, more importantly, <em>the words of one sentence are spread out evenly over the with of the containing element</em>. So, what if these words were elements? Can we do that? Yes, with <code class="inline">inline-block</code>, we can! 

<h3>First attempts</h3>
So let's set a number of elements to <code class="inline">display: inline-block</code> and throw them in a container with <code class="inline">text-align: justify</code> on it:

<pre>
<div class="wrapper"><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div></div>
</pre>

<pre class="language-css" title="CSS"><code>
.wrapper{
  width: 550px;
  text-align: justify;
  background: firebrick;
}

.wrapper div{
  background: white;
  display: inline-block;
}</code>
</pre>

This results into:

<iframe width="100%" height="150" src="http://codepen.io/jelmerdemaat/full/bdHzl" frameborder="0"></iframe>

Hmmm, not quite what we want, is it? Two problems: (1) the "words" (our <code class="inline">div</code>s) aren't spread equally over the complete sentence, and (2) there is annoying white space we don't want. Let's deal with that later. The words don't spread evenly because the sentence is too short. There is nothing that kicks the sentence into "spread mode" because its length is shorter than that of its wrapper. Add more items (words), and it will happen: 



<div class="wrapper"><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div><div>This can be anything.</div></div>


With the same CSS, the result is:

<iframe width="100%" height="150" src="http://codepen.io/jelmerdemaat/full/uodGj" frameborder="0"></iframe>

Cool, right?! The top row of elements is automatically aligned left <em>and</em> right to the parent <code class="inline">div</code>. But it does look totally ugly with the extra elements.


So what if we could add the extra elements in another way that doesn't show an extra line? We need a method to dynamically add an element inside the wrapper, after the content, that overflows the "sentence"... let's do some pseudo-element magic!

<h3>Using :after to force a line-break</h3>
Here, the css :after pseudo-element is a perfect solution. It resides <em>inside</em> the assigned element, but comes <em>after</em> the content. The :after element needs to be inline-block as well to be able to overflow the sentence. Next to this, we assign a <code class="inline">width: 100%</code> to it to make sure it will always be triggering the line-break: 



<pre class="language-css" title="CSS"><code>.wrapper{
  width: 550px;
  text-align: justify;
  background: firebrick;
}

.wrapper div{
  background: white;
  display: inline-block;
}

.wrapper:after{
  content: "";
  width: 100%;
  display: inline-block;
}</code></pre>


The result:

<iframe width="100%" height="130" src="http://codepen.io/jelmerdemaat/full/nwrgb" frameborder="0"></iframe>

Sweet, now we almost have what we want. Only the problem of superfluous white-space remains.

<h3>Removing white-space</h3>
Many <a href="http://css-tricks.com/fighting-the-space-between-inline-block-elements/" title="Chris Coyier: Fighting the Space Between Inline Block Elements" target="_blank">other smart developers</a> have already taken their different takes on this, so I just searched for the best solution:

One way to do it is to chain the elements right after one another. No space in HTML. Keeping an eye on the restrictions and auto-formatting behavior of many content management and online publishing systems, this seemed like an impractical solution to me. The same goes for adding empty HTML comments in between the tags.

Another way is to leave out the end tags. Yes, <a href="http://dev.w3.org/html5/spec/syntax.html#optional-tags" title="HTML5 spec on optional tags" target="_blank">you can do that in HTML5</a>. Unfortunately, this breaks the whole construction in my experiments. It doesn't work anymore when the end tags are removed.

<del datetime="2012-11-14T22:22:28+00:00">This leaves us with one of the nicest and cleanest options available: setting the font-size of the wrapper element to 0. This works perfectly with our solutions, and it's CSS-only.</del> This actually breaks up the whole thing in IE. Hmpf. As I have discovered, a better solution is to <em>keep the spacing in between inline-block elements</em>. This way, inline-block elements don't "stick" to each other. The only thing we have to do now is to get rid of the space the :after element is taking up. The good news: <code class="inline">font-size: 0</code> on the wrapper element takes care of this. The bad news: IE breaks. Alas, the only "solution" I have found so far is to use an IE-specific hack to reset the font-size again. IE users will be left with a very small extra space at the bottom of the wrapper. So be it, for now.

Without any unwanted white-space but including IE hacks (a <a href="http://robertnyman.com/2010/02/24/css-display-inline-block-why-it-rocks-and-why-it-sucks/" target="_blank">small inline-block fix</a> for IE6/7 is also implemented here using <code class="inline">zoom: 1;</code> and <code class="inline">*display: inline</code>), the final solution looks like this:



<pre class="language-css" title="CSS"><code>
.wrapper{
  width: 550px;
  text-align: justify;
  background: firebrick;
  font-size: 0;
  font-size: 12px\9; /* IE6-9 only hack */
}

.wrapper div{
  background: white;
  display: inline-block;
  font-size: 12px;

  zoom: 1;
  *display: inline;
}

.wrapper:after{
  content: "";
  width: 100%;
  display: inline-block;

  zoom: 1;
  *display: inline;
}
</code></pre>


<strong>Result:</strong>

<iframe width="100%" height="130" src="http://codepen.io/jelmerdemaat/full/HDFBL" frameborder="0"></iframe>

And that's it! With such relatively simple CSS, you can achieve a very flexible grid-like layout. The nice this about this is that the widths of the elements can also be percentages. Try scaling your browser window on <a href="http://code.jelmerdemaat.nl/examples/justified-grid-test/" target="_blank">the test page</a> and see the automatic alignment magic happen.

<a href="http://code.jelmerdemaat.nl/examples/justified-grid-test/" title="Test page" target="_blank">That small test page</a> lets you try out different numbers of elements and different widths. Useful for testing and debugging.

So, what's your take on this? Have you used this technique before? Considering browser support, how would you handle it? Do you know of any way to make the :after element take up no space across all browsers without using <code class="inline">font-size: 0</code>? Let me know in the comments!

