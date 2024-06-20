import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DtPkZ9WL.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Hot new platform? Niche corner of the internet? Or one specific to your area? This post will guide you through how to add a new social icon to the theme.</p>\n<h2 id=\"table-of-contents\">Table of contents</h2>\n<p></p><details><summary>Open Table of contents</summary><p></p>\n<ul>\n<li><a href=\"#merging-back-to-the-theme\">Merging back to the theme</a></li>\n<li><a href=\"#getting-things-to-match\">Getting things to match</a></li>\n<li><a href=\"#adding-your-icon-by-example\">Adding your icon, by example</a>\n<ul>\n<li><a href=\"#find-the-icon\">Find the icon</a></li>\n<li><a href=\"#clean-up\">Clean up</a></li>\n</ul>\n</li>\n</ul>\n<p></p></details><p></p>\n<h2 id=\"merging-back-to-the-theme\">Merging back to the theme</h2>\n<p>The maintainer of the theme <a href=\"https://github.com/satnaing\">Sat Naing</a> has said that he intends to only</p>\n<blockquote>\n<p>keep the project supporting only a specific set of popular social icons.</p>\n</blockquote>\n<p>So there is a chance that your icon will not be in the repo, but fear not, it is very easy to add your own!</p>\n<h2 id=\"getting-things-to-match\">Getting things to match</h2>\n<p>The icon set used by the theme come from <a href=\"https://tabler.io/icons\">Tabler</a> and there are a quite a few brands on there.</p>\n<h2 id=\"adding-your-icon-by-example\">Adding your icon, by example</h2>\n<p>For this guide we are going to use the StackOverflow icon as our example.</p>\n<h3 id=\"find-the-icon\">Find the icon</h3>\n<blockquote>\n<p>In this case, we are going to use the <code>StackOverflow</code> as an example.</p>\n</blockquote>\n<p>Searching on Tabler for ‘StackOverflow’ we get a single icon <a href=\"https://tabler.io/icons/icon/brand-stackoverflow\">https://tabler.io/icons/icon/brand-stackoverflow</a>, we are going to need the svg code, so save it for later.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#ABB2BF\">&#x3C;</span><span style=\"color:#E06C75\">svg</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  xmlns</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"http://www.w3.org/2000/svg\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  class</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"icon icon-tabler icon-tabler-brand-stackoverflow\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  width</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"24\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  height</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"24\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  viewBox</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"0 0 24 24\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  stroke-width</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"2\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  stroke</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"currentColor\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  fill</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"none\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  stroke-linecap</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"round\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  stroke-linejoin</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"round\"</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> stroke</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"none\"</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M0 0h24v24H0z\"</span><span style=\"color:#D19A66\"> fill</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"none\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8 16h8\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8.322 12.582l7.956 .836\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8.787 9.168l7.826 1.664\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M10.096 5.764l7.608 2.472\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">&#x3C;/</span><span style=\"color:#E06C75\">svg</span><span style=\"color:#ABB2BF\">></span></span>\n<span class=\"line\"></span></code></pre>\n<h3 id=\"clean-up\">Clean up</h3>\n<p>We need to do some tidy up on what the theme provides us.</p>\n<ol>\n<li>remove all classes other than <code>icon-tabler</code></li>\n<li>remove width &#x26; height</li>\n<li>remove the viewBox</li>\n<li>remove the stroke-width</li>\n<li>remove the stroke</li>\n<li>remove the fill</li>\n</ol>\n<p>This should leave you with the following</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#ABB2BF\">&#x3C;</span><span style=\"color:#E06C75\">svg</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  xmlns</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"http://www.w3.org/2000/svg\"</span></span>\n<span class=\"line\"><span style=\"color:#D19A66\">  class</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"icon-tabler</span></span>\n<span class=\"line\"><span style=\"color:#98C379\">  stroke-linecap=\"</span><span style=\"color:#D19A66\">round</span><span style=\"color:#FFFFFF\">\"</span><span style=\"color:#D19A66\"> stroke-linejoin</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"round\"</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> stroke</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"none\"</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M0 0h24v24H0z\"</span><span style=\"color:#D19A66\"> fill</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"none\"</span><span style=\"color:#ABB2BF\">/></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8 16h8\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8.322 12.582l7.956 .836\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M8.787 9.168l7.826 1.664\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  &#x3C;</span><span style=\"color:#E06C75\">path</span><span style=\"color:#D19A66\"> d</span><span style=\"color:#ABB2BF\">=</span><span style=\"color:#98C379\">\"M10.096 5.764l7.608 2.472\"</span><span style=\"color:#ABB2BF\"> /></span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">&#x3C;/</span><span style=\"color:#E06C75\">svg</span><span style=\"color:#ABB2BF\">></span></span>\n<span class=\"line\"></span></code></pre>\n<p>Now we can add the clean svg code to the <code>src/assets/socialIcons.ts</code> file in <code>SocialIcons</code>.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#C678DD\">const</span><span style=\"color:#E5C07B\"> socialIcons</span><span style=\"color:#56B6C2\"> =</span><span style=\"color:#ABB2BF\"> {</span></span>\n<span class=\"line\"><span style=\"color:#7F848E;font-style:italic\">  /* others */</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  StackOverflow</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">`&#x3C;svg</span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       xmlns=\"http://www.w3.org/2000/svg\"</span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       class=\"icon-tabler</span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       stroke-linecap=\"round\" stroke-linejoin=\"round\"</span></span>\n<span class=\"line\"><span style=\"color:#98C379\">     ></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path d=\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\" /></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path d=\"M8 16h8\" /></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path d=\"M8.322 12.582l7.956 .836\" /></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path d=\"M8.787 9.168l7.826 1.664\" /></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">       &#x3C;path d=\"M10.096 5.764l7.608 2.472\" /></span></span>\n<span class=\"line\"><span style=\"color:#98C379\">     &#x3C;/svg>`</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">};</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Finally we can configure it for our blog in <code>src/config.ts</code> under <code>SOCIALS</code>. Setting <code>active: true</code> to add it to the site.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#C678DD\">export</span><span style=\"color:#C678DD\"> const</span><span style=\"color:#E5C07B\"> SOCIALS</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">SocialObjects</span><span style=\"color:#56B6C2\"> =</span><span style=\"color:#ABB2BF\"> [</span></span>\n<span class=\"line\"><span style=\"color:#7F848E;font-style:italic\">  /* others */</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  {</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">    name</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">\"StackOverflow\"</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">    href</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">\"https://stackoverflow.com/search?q=astropaper\"</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">    linkTitle</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">`See what questions there are about </span><span style=\"color:#C678DD\">${</span><span style=\"color:#E5C07B\">SITE</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#E06C75\">title</span><span style=\"color:#C678DD\">}</span><span style=\"color:#98C379\"> on StackOverflow`</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">    active</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#D19A66\">true</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">  },</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">];</span></span>\n<span class=\"line\"></span></code></pre>\n<blockquote>\n<p>Ensure that <code>href</code> and <code>linkTitle</code> are updated for the corresponding link and label.</p>\n</blockquote>\n<p>Full code for the above steps can be found in <a href=\"https://github.com/satnaing/astro-paper/pull/216/files\">this pull request</a></p>";

				const frontmatter = {"author":"Simon Smale","pubDatetime":"2024-01-08T18:16:00.000Z","modDatetime":null,"title":"How to add a new Social Icon to AstroPaper","featured":false,"draft":false,"tags":["FAQ"],"description":"How to add a new social icon to AstroPaper"};
				const file = "/Users/kanatbektursyn/Documents/pet/own/src/content/blog/how-to-add-a-new-social-icon.md";
				const url = undefined;
				function rawContent() {
					return "\nHot new platform? Niche corner of the internet? Or one specific to your area? This post will guide you through how to add a new social icon to the theme.\n\n## Table of contents\n\n## Merging back to the theme\n\nThe maintainer of the theme [Sat Naing](https://github.com/satnaing) has said that he intends to only\n\n> keep the project supporting only a specific set of popular social icons.\n\nSo there is a chance that your icon will not be in the repo, but fear not, it is very easy to add your own!\n\n## Getting things to match\n\nThe icon set used by the theme come from [Tabler](https://tabler.io/icons) and there are a quite a few brands on there.\n\n## Adding your icon, by example\n\nFor this guide we are going to use the StackOverflow icon as our example.\n\n### Find the icon\n\n> In this case, we are going to use the `StackOverflow` as an example.\n\nSearching on Tabler for 'StackOverflow' we get a single icon <https://tabler.io/icons/icon/brand-stackoverflow>, we are going to need the svg code, so save it for later.\n\n```html\n<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"icon icon-tabler icon-tabler-brand-stackoverflow\"\n  width=\"24\"\n  height=\"24\"\n  viewBox=\"0 0 24 24\"\n  stroke-width=\"2\"\n  stroke=\"currentColor\"\n  fill=\"none\"\n  stroke-linecap=\"round\"\n  stroke-linejoin=\"round\"\n>\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" />\n  <path d=\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\" />\n  <path d=\"M8 16h8\" />\n  <path d=\"M8.322 12.582l7.956 .836\" />\n  <path d=\"M8.787 9.168l7.826 1.664\" />\n  <path d=\"M10.096 5.764l7.608 2.472\" />\n</svg>\n```\n\n### Clean up\n\nWe need to do some tidy up on what the theme provides us.\n\n1. remove all classes other than `icon-tabler`\n2. remove width & height\n3. remove the viewBox\n4. remove the stroke-width\n5. remove the stroke\n6. remove the fill\n\nThis should leave you with the following\n\n```html\n<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  class=\"icon-tabler\n  stroke-linecap=\"round\" stroke-linejoin=\"round\"\n>\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n  <path d=\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\" />\n  <path d=\"M8 16h8\" />\n  <path d=\"M8.322 12.582l7.956 .836\" />\n  <path d=\"M8.787 9.168l7.826 1.664\" />\n  <path d=\"M10.096 5.764l7.608 2.472\" />\n</svg>\n```\n\nNow we can add the clean svg code to the `src/assets/socialIcons.ts` file in `SocialIcons`.\n\n```typescript\nconst socialIcons = {\n  /* others */\n  StackOverflow: `<svg\n       xmlns=\"http://www.w3.org/2000/svg\"\n       class=\"icon-tabler\n       stroke-linecap=\"round\" stroke-linejoin=\"round\"\n     >\n       <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n       <path d=\"M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1\" />\n       <path d=\"M8 16h8\" />\n       <path d=\"M8.322 12.582l7.956 .836\" />\n       <path d=\"M8.787 9.168l7.826 1.664\" />\n       <path d=\"M10.096 5.764l7.608 2.472\" />\n     </svg>`,\n};\n```\n\nFinally we can configure it for our blog in `src/config.ts` under `SOCIALS`. Setting `active: true` to add it to the site.\n\n```typescript\nexport const SOCIALS: SocialObjects = [\n  /* others */\n  {\n    name: \"StackOverflow\",\n    href: \"https://stackoverflow.com/search?q=astropaper\",\n    linkTitle: `See what questions there are about ${SITE.title} on StackOverflow`,\n    active: true,\n  },\n];\n```\n\n> Ensure that `href` and `linkTitle` are updated for the corresponding link and label.\n\nFull code for the above steps can be found in [this pull request](https://github.com/satnaing/astro-paper/pull/216/files)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"table-of-contents","text":"Table of contents"},{"depth":2,"slug":"merging-back-to-the-theme","text":"Merging back to the theme"},{"depth":2,"slug":"getting-things-to-match","text":"Getting things to match"},{"depth":2,"slug":"adding-your-icon-by-example","text":"Adding your icon, by example"},{"depth":3,"slug":"find-the-icon","text":"Find the icon"},{"depth":3,"slug":"clean-up","text":"Clean up"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
