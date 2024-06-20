import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_DtPkZ9WL.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>In this post I will explain how to use the pre-commit Git hook to automate the input of the created (<code>pubDatetime</code>) and modified (<code>modDatetime</code>) in the AstroPaper blog theme frontmatter</p>\n<h2 id=\"table-of-contents\">Table of contents</h2>\n<p></p><details><summary>Open Table of contents</summary><p></p>\n<ul>\n<li><a href=\"#have-them-everywhere\">Have them Everywhere</a></li>\n<li><a href=\"#the-hook\">The Hook</a>\n<ul>\n<li><a href=\"#updating-the-modified-date-when-a-file-is-edited\">Updating the modified date when a file is edited</a>\n<ul>\n<li><a href=\"#improvement---more-explicit\">Improvement - More Explicit</a></li>\n<li><a href=\"#note\">NOTE</a></li>\n</ul>\n</li>\n<li><a href=\"#adding-the-date-for-new-files\">Adding the Date for new files</a>\n<ul>\n<li><a href=\"#improvement---only-loop-once\">Improvement - Only Loop Once</a></li>\n</ul>\n</li>\n</ul>\n</li>\n<li><a href=\"#populating-the-frontmatter\">Populating the frontmatter</a></li>\n<li><a href=\"#empty-moddatetime-changes\">Empty <code>modDatetime</code> changes</a></li>\n</ul>\n<p></p></details><p></p>\n<h2 id=\"have-them-everywhere\">Have them Everywhere</h2>\n<p><a href=\"https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks\">Git hooks</a> are great for automating tasks like <a href=\"https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea\">adding</a> or <a href=\"https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e\">checking</a> the branch name to your commit messages or <a href=\"https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000\">stopping you committing plain text secrets</a>. Their biggest flaw is that client-side hooks are per machine.</p>\n<p>You can get around this by having a <code>hooks</code> directory and manually copy them to the <code>.git/hooks</code> directory or set up a symlink, but this all requires you to remember to set it up, and that is not something I am good at doing.</p>\n<p>As this project uses npm, we are able to make use of a package called <a href=\"https://typicode.github.io/husky/\">Husky</a> (this is already installed in AstroPaper) to automatically install the hooks for us.</p>\n<h2 id=\"the-hook\">The Hook</h2>\n<p>As we want this hook to run as we commit the code to update the dates and then have that as part of our change we are going to use the <code>pre-commit</code> hook. This has already been set up by this AstroPaper project, but if it hadn’t, you would run <code>npx husky add .husky/pre-commit 'echo \"This is our new pre-commit hook\"'</code>.</p>\n<p>Navigating to the <code>hooks/pre-commit</code> file, we are going to add one or both of the following snippets.</p>\n<h3 id=\"updating-the-modified-date-when-a-file-is-edited\">Updating the modified date when a file is edited</h3>\n<hr>\n<p>UPDATE:</p>\n<p>This section has been updated with a new version of the hook that is smarter. It will now not increment the <code>modDatetime</code> until the post is published. On the first publish, set the draft status to <code>first</code> and watch the magic happen.</p>\n<hr>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#7F848E;font-style:italic\"># Modified files, update the modDatetime</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">git</span><span style=\"color:#98C379\"> diff</span><span style=\"color:#D19A66\"> --cached</span><span style=\"color:#D19A66\"> --name-status</span><span style=\"color:#ABB2BF\"> |</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">grep</span><span style=\"color:#D19A66\"> -i</span><span style=\"color:#98C379\"> '^M.*\\.md$'</span><span style=\"color:#ABB2BF\"> |</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">while</span><span style=\"color:#56B6C2\"> read</span><span style=\"color:#98C379\"> _</span><span style=\"color:#98C379\"> file</span><span style=\"color:#ABB2BF\">; </span><span style=\"color:#C678DD\">do</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  filecontent</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#61AFEF\">cat</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$file</span><span style=\"color:#98C379\">\")</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  frontmatter</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#56B6C2\">echo</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$filecontent</span><span style=\"color:#98C379\">\" </span><span style=\"color:#ABB2BF\">|</span><span style=\"color:#61AFEF\"> awk</span><span style=\"color:#D19A66\"> -v</span><span style=\"color:#98C379\"> RS='---' 'NR==2{print}')</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  draft</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#56B6C2\">echo</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$frontmatter</span><span style=\"color:#98C379\">\" </span><span style=\"color:#ABB2BF\">|</span><span style=\"color:#61AFEF\"> awk</span><span style=\"color:#98C379\"> '/^draft: /{print $2}')</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">  if</span><span style=\"color:#ABB2BF\"> [ </span><span style=\"color:#98C379\">\"</span><span style=\"color:#E06C75\">$draft</span><span style=\"color:#98C379\">\"</span><span style=\"color:#56B6C2\"> =</span><span style=\"color:#98C379\"> \"false\"</span><span style=\"color:#ABB2BF\"> ]; </span><span style=\"color:#C678DD\">then</span></span>\n<span class=\"line\"><span style=\"color:#56B6C2\">    echo</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$file</span><span style=\"color:#98C379\"> modDateTime updated\"</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    cat</span><span style=\"color:#E06C75\"> $file</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#61AFEF\">sed</span><span style=\"color:#98C379\"> \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(</span><span style=\"color:#61AFEF\">date</span><span style=\"color:#D19A66\"> -u</span><span style=\"color:#98C379\"> \"+%Y-%m-%dT%H:%M:%SZ\")/\"</span><span style=\"color:#ABB2BF\"> > </span><span style=\"color:#98C379\">tmp</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    mv</span><span style=\"color:#98C379\"> tmp</span><span style=\"color:#E06C75\"> $file</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    git</span><span style=\"color:#98C379\"> add</span><span style=\"color:#E06C75\"> $file</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">  fi</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">  if</span><span style=\"color:#ABB2BF\"> [ </span><span style=\"color:#98C379\">\"</span><span style=\"color:#E06C75\">$draft</span><span style=\"color:#98C379\">\"</span><span style=\"color:#56B6C2\"> =</span><span style=\"color:#98C379\"> \"first\"</span><span style=\"color:#ABB2BF\"> ]; </span><span style=\"color:#C678DD\">then</span></span>\n<span class=\"line\"><span style=\"color:#56B6C2\">    echo</span><span style=\"color:#98C379\"> \"First release of </span><span style=\"color:#E06C75\">$file</span><span style=\"color:#98C379\">, draft set to false and modDateTime removed\"</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    cat</span><span style=\"color:#E06C75\"> $file</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#61AFEF\">sed</span><span style=\"color:#98C379\"> \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/\"</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#61AFEF\">sed</span><span style=\"color:#98C379\"> \"/---.*/,/---.*/s/^draft:.*$/draft: false/\"</span><span style=\"color:#ABB2BF\"> > </span><span style=\"color:#98C379\">tmp</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    mv</span><span style=\"color:#98C379\"> tmp</span><span style=\"color:#E06C75\"> $file</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">    git</span><span style=\"color:#98C379\"> add</span><span style=\"color:#E06C75\"> $file</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">  fi</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">done</span></span>\n<span class=\"line\"></span></code></pre>\n<p><code>git diff --cached --name-status</code> gets the files from git that have been staged for committing. The output looks like:</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#61AFEF\">A</span><span style=\"color:#98C379\">       src/content/blog/setting-dates-via-git-hooks.md</span></span>\n<span class=\"line\"></span></code></pre>\n<p>The letter at the start denotes what action has been taken, in the above example the file has been added. Modified files have <code>M</code></p>\n<p>We pipe that output into the grep command where we are looking at each line to find that have been modified. The line needs to start with <code>M</code> (<code>^(M)</code>), have any number of characters after that (<code>.*</code>) and end with the <code>.md</code> file extension (<code>.(md)$</code>).This is going to filter out the lines that are not modified markdown files <code>egrep -i \"^(M).*\\.(md)$\"</code>.</p>\n<hr>\n<h4 id=\"improvement---more-explicit\">Improvement - More Explicit</h4>\n<p>This could be added to only look for files that we markdown files in the <code>blog</code> directory, as these are the only ones that will have the right frontmatter</p>\n<hr>\n<p>The regex will capture the two parts, the letter and the file path. We are going to pipe this list into a while loop to iterate over the matching lines and assign the letter to <code>a</code> and the path to <code>b</code>. We are going to ignore <code>a</code> for now.</p>\n<p>To know the draft staus of the file, we need its frontmatter. In the following code we are using <code>cat</code> to get the content of the file, then using <code>awk</code> to split the file on the frontmatter separator (<code>---</code>) and taking the second block (the fonmtmatter, the bit between the <code>---</code>). From here we are using <code>awk</code> again to find the draft key and print is value.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#E06C75\">  filecontent</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#61AFEF\">cat</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$file</span><span style=\"color:#98C379\">\")</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  frontmatter</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#56B6C2\">echo</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$filecontent</span><span style=\"color:#98C379\">\" </span><span style=\"color:#ABB2BF\">|</span><span style=\"color:#61AFEF\"> awk</span><span style=\"color:#D19A66\"> -v</span><span style=\"color:#98C379\"> RS='---' 'NR==2{print}')</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  draft</span><span style=\"color:#56B6C2\">=</span><span style=\"color:#98C379\">$(</span><span style=\"color:#56B6C2\">echo</span><span style=\"color:#98C379\"> \"</span><span style=\"color:#E06C75\">$frontmatter</span><span style=\"color:#98C379\">\" </span><span style=\"color:#ABB2BF\">|</span><span style=\"color:#61AFEF\"> awk</span><span style=\"color:#98C379\"> '/^draft: /{print $2}')</span></span>\n<span class=\"line\"></span></code></pre>\n<p>Now we have the value for <code>draft</code> we are going to do 1 of 3 things, set the modDatetime to now (when draft is false <code>if [ \"$draft\" = \"false\" ]; then</code>), clear the modDatetime and set draft to false (when draft is set to first <code>if [ \"$draft\" = \"first\" ]; then</code>), or nothing (in any other case).</p>\n<p>The next part with the sed command is a bit magical to me as I don’t often use it, it was copied from <a href=\"https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/\">another blog post on doing something similar</a>. In essence, it is looking inside the frontmatter tags (<code>---</code>) of the file to find the <code>pubDatetime:</code> key, getting the full line and replacing it with the <code>pubDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\"</code> same key again and the current datetime formatted correctly.</p>\n<p>This replacement is in the context of the whole file so we put that into a temporary file (<code>> tmp</code>), then we move (<code>mv</code>) the new file into the location of the old file, overwriting it. This is then added to git ready to be committed as if we made the change ourselves.</p>\n<hr>\n<h4 id=\"note\">NOTE</h4>\n<p>For the <code>sed</code> to work the frontmatter needs to already have the <code>modDatetime</code> key in the frontmatter. There are some other changes you will need to make for the app to build with a blank date, see <a href=\"#empty-moddatetime-changes\">further down</a></p>\n<hr>\n<h3 id=\"adding-the-date-for-new-files\">Adding the Date for new files</h3>\n<p>Adding the date for a new file is the same process as above, but this time we are looking for lines that have been added (<code>A</code>) and we are going to replace the <code>pubDatetime</code> value.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#7F848E;font-style:italic\"># New files, add/update the pubDatetime</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">git</span><span style=\"color:#98C379\"> diff</span><span style=\"color:#D19A66\"> --cached</span><span style=\"color:#D19A66\"> --name-status</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#61AFEF\">egrep</span><span style=\"color:#D19A66\"> -i</span><span style=\"color:#98C379\"> \"^(A).*\\.(md)$\"</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#C678DD\">while</span><span style=\"color:#56B6C2\"> read</span><span style=\"color:#98C379\"> a</span><span style=\"color:#98C379\"> b</span><span style=\"color:#ABB2BF\">; </span><span style=\"color:#C678DD\">do</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">  cat</span><span style=\"color:#E06C75\"> $b</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#61AFEF\">sed</span><span style=\"color:#98C379\"> \"/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(</span><span style=\"color:#61AFEF\">date</span><span style=\"color:#D19A66\"> -u</span><span style=\"color:#98C379\"> \"+%Y-%m-%dT%H:%M:%SZ\")/\"</span><span style=\"color:#ABB2BF\"> > </span><span style=\"color:#98C379\">tmp</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">  mv</span><span style=\"color:#98C379\"> tmp</span><span style=\"color:#E06C75\"> $b</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">  git</span><span style=\"color:#98C379\"> add</span><span style=\"color:#E06C75\"> $b</span></span>\n<span class=\"line\"><span style=\"color:#C678DD\">done</span></span>\n<span class=\"line\"></span></code></pre>\n<hr>\n<h4 id=\"improvement---only-loop-once\">Improvement - Only Loop Once</h4>\n<p>We could use the <code>a</code> variable to switch inside the loop and either update the <code>modDatetime</code> or add the <code>pubDatetime</code> in one loop.</p>\n<hr>\n<h2 id=\"populating-the-frontmatter\">Populating the frontmatter</h2>\n<p>If your IDE supports snippets then there is the option to create a custom snippet to populate the frontmatter.<a href=\"https://github.com/satnaing/astro-paper/pull/206\">In AstroPaper v4 will come with one for VSCode by default.</a></p>\n<video autoplay muted controls plays-inline=\"true\" class=\"border border-skin-line\">\n  <source src=\"https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0\" type=\"video/mp4\">\n</video>\n<h2 id=\"empty-moddatetime-changes\">Empty <code>modDatetime</code> changes</h2>\n<p>To allow Astro to compile the markdown and do its thing, it needs to know what is expected in the frontmatter. It does this via the config in <code>src/content/config.ts</code></p>\n<p>To allow the key to be there with no value we need to edit line 10 to add the <code>.nullable()</code> function.</p>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#C678DD\">const</span><span style=\"color:#E5C07B\"> blog</span><span style=\"color:#56B6C2\"> =</span><span style=\"color:#61AFEF\"> defineCollection</span><span style=\"color:#ABB2BF\">({</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  type</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">\"content\"</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#61AFEF\">  schema</span><span style=\"color:#ABB2BF\">: ({ </span><span style=\"color:#E06C75;font-style:italic\">image</span><span style=\"color:#ABB2BF\"> }) </span><span style=\"color:#C678DD\">=></span></span>\n<span class=\"line\"><span style=\"color:#E5C07B\">    z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">object</span><span style=\"color:#ABB2BF\">({</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      author</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">default</span><span style=\"color:#ABB2BF\">(</span><span style=\"color:#E5C07B\">SITE</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#E06C75\">author</span><span style=\"color:#ABB2BF\">),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      pubDatetime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">date</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">-     </span><span style=\"color:#E06C75\">modDatetime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">date</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">+     </span><span style=\"color:#E06C75\">modDatetime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">date</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">nullable</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      title</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      featured</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">boolean</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      draft</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">boolean</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      tags</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">array</span><span style=\"color:#ABB2BF\">(</span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">()).</span><span style=\"color:#61AFEF\">default</span><span style=\"color:#ABB2BF\">([</span><span style=\"color:#98C379\">\"others\"</span><span style=\"color:#ABB2BF\">]),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      ogImage</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#61AFEF\">image</span><span style=\"color:#ABB2BF\">()</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">        .</span><span style=\"color:#61AFEF\">refine</span><span style=\"color:#ABB2BF\">(</span><span style=\"color:#E06C75;font-style:italic\">img</span><span style=\"color:#C678DD\"> =></span><span style=\"color:#E5C07B\"> img</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#E06C75\">width</span><span style=\"color:#56B6C2\"> >=</span><span style=\"color:#D19A66\"> 1200</span><span style=\"color:#56B6C2\"> &#x26;&#x26;</span><span style=\"color:#E5C07B\"> img</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#E06C75\">height</span><span style=\"color:#56B6C2\"> >=</span><span style=\"color:#D19A66\"> 630</span><span style=\"color:#ABB2BF\">, {</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">          message</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#98C379\">\"OpenGraph image must be at least 1200 X 630 pixels!\"</span><span style=\"color:#ABB2BF\">,</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">        })</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">        .</span><span style=\"color:#61AFEF\">or</span><span style=\"color:#ABB2BF\">(</span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">())</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">        .</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      description</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      canonicalURL</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">      readingTime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">z</span><span style=\"color:#ABB2BF\">.</span><span style=\"color:#61AFEF\">string</span><span style=\"color:#ABB2BF\">().</span><span style=\"color:#61AFEF\">optional</span><span style=\"color:#ABB2BF\">(),</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">    }),</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">});</span></span>\n<span class=\"line\"></span></code></pre>\n<p>To stop the IDE complaining in the blog engine files I have also done the following:</p>\n<ol>\n<li>added <code>| null</code> to line 15 in <code>src/layouts/Layout.astro</code> so that it looks like</li>\n</ol>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#C678DD\">export</span><span style=\"color:#C678DD\"> interface</span><span style=\"color:#E5C07B\"> Props</span><span style=\"color:#ABB2BF\"> {</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  title</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  author</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  description</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  ogImage</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  canonicalURL</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  pubDatetime</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">Date</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  modDatetime</span><span style=\"color:#C678DD\">?</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">Date</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#E5C07B\">null</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">}</span></span>\n<span class=\"line\"></span></code></pre>\n<!-- This needs to be 2 as it doesn't pick it up with the code block -->\n<ol start=\"2\">\n<li>added <code>| null</code> to line 5 in <code>src/components/Datetime.tsx</code> so that it looks like</li>\n</ol>\n<pre class=\"astro-code one-dark-pro\" style=\"background-color:#282c34;color:#abb2bf; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#C678DD\">interface</span><span style=\"color:#E5C07B\"> DatetimesProps</span><span style=\"color:#ABB2BF\"> {</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  pubDatetime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#E5C07B\">Date</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#E06C75\">  modDatetime</span><span style=\"color:#ABB2BF\">: </span><span style=\"color:#E5C07B\">string</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#E5C07B\">Date</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#E5C07B\">undefined</span><span style=\"color:#ABB2BF\"> | </span><span style=\"color:#E5C07B\">null</span><span style=\"color:#ABB2BF\">;</span></span>\n<span class=\"line\"><span style=\"color:#ABB2BF\">}</span></span>\n<span class=\"line\"></span></code></pre>";

				const frontmatter = {"author":"Simon Smale","pubDatetime":"2024-01-03T20:40:08.000Z","modDatetime":"2024-01-08T18:59:05.000Z","title":"How to use Git Hooks to set Created and Modified Dates","featured":false,"draft":false,"tags":["docs","FAQ"],"canonicalURL":"https://smale.codes/posts/setting-dates-via-git-hooks/","description":"How to use Git Hooks to set your Created and Modified Dates on AstroPaper"};
				const file = "/Users/kanatbektursyn/Documents/pet/own/src/content/blog/setting-dates-via-git-hooks.md";
				const url = undefined;
				function rawContent() {
					return "\nIn this post I will explain how to use the pre-commit Git hook to automate the input of the created (`pubDatetime`) and modified (`modDatetime`) in the AstroPaper blog theme frontmatter\n\n## Table of contents\n\n## Have them Everywhere\n\n[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are great for automating tasks like [adding](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) or [checking](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) the branch name to your commit messages or [stopping you committing plain text secrets](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000). Their biggest flaw is that client-side hooks are per machine.\n\nYou can get around this by having a `hooks` directory and manually copy them to the `.git/hooks` directory or set up a symlink, but this all requires you to remember to set it up, and that is not something I am good at doing.\n\nAs this project uses npm, we are able to make use of a package called [Husky](https://typicode.github.io/husky/) (this is already installed in AstroPaper) to automatically install the hooks for us.\n\n## The Hook\n\nAs we want this hook to run as we commit the code to update the dates and then have that as part of our change we are going to use the `pre-commit` hook. This has already been set up by this AstroPaper project, but if it hadn't, you would run `npx husky add .husky/pre-commit 'echo \"This is our new pre-commit hook\"'`.\n\nNavigating to the `hooks/pre-commit` file, we are going to add one or both of the following snippets.\n\n### Updating the modified date when a file is edited\n\n---\n\nUPDATE:\n\nThis section has been updated with a new version of the hook that is smarter. It will now not increment the `modDatetime` until the post is published. On the first publish, set the draft status to `first` and watch the magic happen.\n\n---\n\n```shell\n# Modified files, update the modDatetime\ngit diff --cached --name-status |\ngrep -i '^M.*\\.md$' |\nwhile read _ file; do\n  filecontent=$(cat \"$file\")\n  frontmatter=$(echo \"$filecontent\" | awk -v RS='---' 'NR==2{print}')\n  draft=$(echo \"$frontmatter\" | awk '/^draft: /{print $2}')\n  if [ \"$draft\" = \"false\" ]; then\n    echo \"$file modDateTime updated\"\n    cat $file | sed \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\" > tmp\n    mv tmp $file\n    git add $file\n  fi\n  if [ \"$draft\" = \"first\" ]; then\n    echo \"First release of $file, draft set to false and modDateTime removed\"\n    cat $file | sed \"/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/\" | sed \"/---.*/,/---.*/s/^draft:.*$/draft: false/\" > tmp\n    mv tmp $file\n    git add $file\n  fi\ndone\n```\n\n`git diff --cached --name-status` gets the files from git that have been staged for committing. The output looks like:\n\n```shell\nA       src/content/blog/setting-dates-via-git-hooks.md\n```\n\nThe letter at the start denotes what action has been taken, in the above example the file has been added. Modified files have `M`\n\nWe pipe that output into the grep command where we are looking at each line to find that have been modified. The line needs to start with `M` (`^(M)`), have any number of characters after that (`.*`) and end with the `.md` file extension (`.(md)$`).This is going to filter out the lines that are not modified markdown files `egrep -i \"^(M).*\\.(md)$\"`.\n\n---\n\n#### Improvement - More Explicit\n\nThis could be added to only look for files that we markdown files in the `blog` directory, as these are the only ones that will have the right frontmatter\n\n---\n\nThe regex will capture the two parts, the letter and the file path. We are going to pipe this list into a while loop to iterate over the matching lines and assign the letter to `a` and the path to `b`. We are going to ignore `a` for now.\n\nTo know the draft staus of the file, we need its frontmatter. In the following code we are using `cat` to get the content of the file, then using `awk` to split the file on the frontmatter separator (`---`) and taking the second block (the fonmtmatter, the bit between the `---`). From here we are using `awk` again to find the draft key and print is value.\n\n```shell\n  filecontent=$(cat \"$file\")\n  frontmatter=$(echo \"$filecontent\" | awk -v RS='---' 'NR==2{print}')\n  draft=$(echo \"$frontmatter\" | awk '/^draft: /{print $2}')\n```\n\nNow we have the value for `draft` we are going to do 1 of 3 things, set the modDatetime to now (when draft is false `if [ \"$draft\" = \"false\" ]; then`), clear the modDatetime and set draft to false (when draft is set to first `if [ \"$draft\" = \"first\" ]; then`), or nothing (in any other case).\n\nThe next part with the sed command is a bit magical to me as I don't often use it, it was copied from [another blog post on doing something similar](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/). In essence, it is looking inside the frontmatter tags (`---`) of the file to find the `pubDatetime:` key, getting the full line and replacing it with the `pubDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\"` same key again and the current datetime formatted correctly.\n\nThis replacement is in the context of the whole file so we put that into a temporary file (`> tmp`), then we move (`mv`) the new file into the location of the old file, overwriting it. This is then added to git ready to be committed as if we made the change ourselves.\n\n---\n\n#### NOTE\n\nFor the `sed` to work the frontmatter needs to already have the `modDatetime` key in the frontmatter. There are some other changes you will need to make for the app to build with a blank date, see [further down](#empty-moddatetime-changes)\n\n---\n\n### Adding the Date for new files\n\nAdding the date for a new file is the same process as above, but this time we are looking for lines that have been added (`A`) and we are going to replace the `pubDatetime` value.\n\n```shell\n# New files, add/update the pubDatetime\ngit diff --cached --name-status | egrep -i \"^(A).*\\.(md)$\" | while read a b; do\n  cat $b | sed \"/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u \"+%Y-%m-%dT%H:%M:%SZ\")/\" > tmp\n  mv tmp $b\n  git add $b\ndone\n```\n\n---\n\n#### Improvement - Only Loop Once\n\nWe could use the `a` variable to switch inside the loop and either update the `modDatetime` or add the `pubDatetime` in one loop.\n\n---\n\n## Populating the frontmatter\n\nIf your IDE supports snippets then there is the option to create a custom snippet to populate the frontmatter.[In AstroPaper v4 will come with one for VSCode by default.](https://github.com/satnaing/astro-paper/pull/206)\n\n<video autoplay muted=\"muted\" controls plays-inline=\"true\" class=\"border border-skin-line\">\n  <source src=\"https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0\" type=\"video/mp4\">\n</video>\n\n## Empty `modDatetime` changes\n\nTo allow Astro to compile the markdown and do its thing, it needs to know what is expected in the frontmatter. It does this via the config in `src/content/config.ts`\n\nTo allow the key to be there with no value we need to edit line 10 to add the `.nullable()` function.\n\n```typescript\nconst blog = defineCollection({\n  type: \"content\",\n  schema: ({ image }) =>\n    z.object({\n      author: z.string().default(SITE.author),\n      pubDatetime: z.date(),\n-     modDatetime: z.date().optional(),\n+     modDatetime: z.date().optional().nullable(),\n      title: z.string(),\n      featured: z.boolean().optional(),\n      draft: z.boolean().optional(),\n      tags: z.array(z.string()).default([\"others\"]),\n      ogImage: image()\n        .refine(img => img.width >= 1200 && img.height >= 630, {\n          message: \"OpenGraph image must be at least 1200 X 630 pixels!\",\n        })\n        .or(z.string())\n        .optional(),\n      description: z.string(),\n      canonicalURL: z.string().optional(),\n      readingTime: z.string().optional(),\n    }),\n});\n```\n\nTo stop the IDE complaining in the blog engine files I have also done the following:\n\n1. added `| null` to line 15 in `src/layouts/Layout.astro` so that it looks like\n\n```typescript\nexport interface Props {\n  title?: string;\n  author?: string;\n  description?: string;\n  ogImage?: string;\n  canonicalURL?: string;\n  pubDatetime?: Date;\n  modDatetime?: Date | null;\n}\n```\n\n<!-- This needs to be 2 as it doesn't pick it up with the code block -->\n\n2. added `| null` to line 5 in `src/components/Datetime.tsx` so that it looks like\n\n```typescript\ninterface DatetimesProps {\n  pubDatetime: string | Date;\n  modDatetime: string | Date | undefined | null;\n}\n```\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"table-of-contents","text":"Table of contents"},{"depth":2,"slug":"have-them-everywhere","text":"Have them Everywhere"},{"depth":2,"slug":"the-hook","text":"The Hook"},{"depth":3,"slug":"updating-the-modified-date-when-a-file-is-edited","text":"Updating the modified date when a file is edited"},{"depth":4,"slug":"improvement---more-explicit","text":"Improvement - More Explicit"},{"depth":4,"slug":"note","text":"NOTE"},{"depth":3,"slug":"adding-the-date-for-new-files","text":"Adding the Date for new files"},{"depth":4,"slug":"improvement---only-loop-once","text":"Improvement - Only Loop Once"},{"depth":2,"slug":"populating-the-frontmatter","text":"Populating the frontmatter"},{"depth":2,"slug":"empty-moddatetime-changes","text":"Empty modDatetime changes"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
