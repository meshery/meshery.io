---
date: 2023-01-26 10:30:05 -0530
heading: Meshery System Provider
title: Meshery System Provider
author: Lee Calcote
categories: 
  - extensibility
redirect_from: /blog/mesheryctl-system-provider
---

<div style="text-align:center;padding:20px">
<img src="{{site.baseurl}}/assets/images/posts/2023/2023-01-26-meshery-system-provider/system-provider.png#center" style="width:75%"  alt="System Provider" /></div> Meshery offers Providers as a point of extensibility. With a built-in Local Provider (named “None”), Meshery Remote Providers are designed to be pluggable. Remote Providers offer points of extension to users / integrators to deliver enhanced functionality, using Meshery as a platform. 

<p>
 A Meshery provider can be selected through the UI at the ‘/provider’ endpoint which added the ability to enforce the selection of a specific provider through an environment variable allowing the enforcement of a provider through the meshconfig.
</p>

<p>
The CLI command `mesheryctl system provider`  would enable users to enforce a specific provider for a Meshery deployment without having to manually change the meshconfig or set an environment variable.
</p>

<h2> What Meshery System Provider Enables: </h2>
<p>
<ol>
  <li>Enforcing a provider for a Meshery deployment</li>
  <li>Perform the following actions with providers</li>
  <ol>
      <li>view current provider</li>
      <li>list available providers</li>
      <li>set provider to be enforced</li>
      <li>set provider to be enforced and apply changes</li>
      <li>reset provider to default</li>
    </ol>
</ol>
</p>
<p>Subcommands with the specific functions:</p> 

<div id="channelset" class="highlight-code">
  <code class="code-box">mesheryctl system provider [view|list|set [provider]|switch [provider] prvider reset] 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="mesheryctl system provider [view|list|set [provider]|switch [provider] prvider reset]" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>



This command will enforces provider used by Meshery
<code class="code-block">mesheryctl system provider</code>

<h2>FAQs</h2>

<h3>What is the difference between the ‘switch’ and ‘set’ commands ?</h3>

<p>
<ul>
  <li>The ‘set’ command sets the provider of the context in focus in the meshconfig. The change will be reflected only when Meshery is redeployed.</li>
  <li>The ‘switch’ command sets the provider of the context in focus in the meshconfig and asks for permission to redeploy Meshery immediately.</li>
  <li>The reason for having both a ‘set’ and a ‘switch’ is to maintain consistency with the `mesheryctl system channel` which has both a ‘set’ and a ‘switch’ with the above functionality.
</li>
</ul>
</p>

<h3>What is the ‘reset’ command for ?</h3>
<p>The ‘reset’ command can be used to reset the provider value of context in focus in the meshconfig to the default after having used the ‘set’ or ‘switch’ commands.  The change will be reflected only when Meshery is redeployed. Currently the default provider field is empty i.e. no provider is enforced by default.
</p><code class="code-block">mesheryctl system provider reset</code>. If you don't have mesheryctl installed, you can install it by following the instructions in the  <a href="https://docs.meshery.io/installation/mesheryctl">Meshery documentation</a>.

<h3>Why does the  ‘set’ command have a ‘–-force’ flag ?</h3>
<p>The set command uses the '/api/providers’ endpoint of the Meshery server to verify whether a valid provider is being set.  If the endpoint is inaccessible due to the Meshery server not running or the provider passed to the command is invalid, then the provider is not set in the meshconfig.  To override this behavior the ‘--force’ flag can be used.</p>
