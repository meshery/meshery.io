---
date: 2023-06-16 10:30:05 -0530
heading: Changing Meshery Release Channels
title: Changing Meshery Release Channels
author: Meshery Contributors
categories: 
  - continuous-integration
  - releases
  - mesheryctl
redirect_from: /blog/changing-meshery-release-channels
---

<div style="text-align:center;padding:20px">
<img src="{{site.baseurl}}/assets/images/posts/2023/2023-06-16-changing-meshery-release-channels/change-meshery-release-channels.png" style="width:75%"  alt="Change Meshery Release Channels" /></div>

Meshery is constantly evolving and improving, with new features and bug fixes being added regularly. To stay up to date with the latest Meshery features and updates, you can switch between different release channels.
<p>
  Artifacts of the builds for Meshery and its components are published under two different release channels, so that improved controls may be provided to both  Meshery users and Meshery developers. The two release channels are edge and stable release channels. Relative to stable releases, edge releases occur much more frequently. Edge releases are made with each merge to master, unless that merge to master is for a stable release. Stable releases are made with each
  merge to master when a GitHub release tag is also present in the workflow.
</p>

<h2> How release channels offer subscription </h2>
<p>
  Release Channels offers a subsciption where user can subscribe to a specific  release channel and get notified when a new release is available. This is  useful for users who want to stay up to date with the latest Meshery features, while also also providing flexibility for users who want to stay on a specific version of Meshery.
  However, this approach can be risky because some updates may introduce bugs or compatibility issues that could break your existing installation. Depending upon your risk aversion and the nature of your deployment environment, having a subscription means that you will automatically receive these updates that you might not be ready incorporate.   On the other hand, release channels also offer the ability to pin to a specific release which is a  good thing as it allows users to maintain stability and predictability of their environment by preventing unexpected changes from being introduced into their system. However, doing so cancels out any future subscription-based benefits such as receiving security patches or bug fixes that were added after that version was released.

Therefore, it's important for you to weigh the pros and cons of each option before making decisions on how you want to manage your Meshery deployment. It's recommended you and your organizations have a well-defined upgrade strategy based on testing and validation procedures prior to applying new releases in production environments whether via subscriptions or manual upgrades to ensure that system availability is maintained and risks are minimized.

</p>
To subscribe to a specific release channel or version using mesheryctl you can use 

<div id="channelset" class="highlight-code">
  <code class="code-box">mesheryctl system channel set [stable|stable-version|edge|edge-version] 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="mesheryctl system channel set [stable|stable-version|edge|edge-version]" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>



This command will update your local Meshery configuration to use the selected channel for future updates. To set the channel to a specific version, replace Version with the desired version number. Example: 
<code class="code-block">mesheryctl system channel set stable</code>
or <code class="code-block">mesheryctl system channel set stable-v0.5.56</code>

<h2> Switching between Release Channels</h2>
<p>There are two ways to switch between Meshery release channels: using mesheryctl or by editing your meshconfig file. In this blog post, we'll cover both methods.</p>

<h3>What is Meshconfig?</h3>

<p>
  Meshconfig is a configuration file that is used to configure Meshery. It is typically located in the 
  <code class="code-block">~/.meshery/config.yaml</code> directory. It contains information about the current release channel, the version of Meshery that is installed, and other configuration options that are specific to your Meshery installation. 
  Meshconfig is automatically generated when you run Meshery for the first time. It is also automatically updated when you update Meshery
</p>

<h3>Switching between Meshery release channels using meshconfig file.</h3>
<p>Open your terminal and confirm that you have mesheryctl installed by running  </p><code class="code-block">mesheryctl version</code>. If you don't have mesheryctl installed, you can install it by following the instructions in the  <a href="https://docs.meshery.io/installation/mesheryctl">Meshery documentation</a>.

<p>1. Create new Meshery config.yaml file</p> 
<div id="contextcreate" class="highlight-code">
  <code class="code-box">mesheryctl system context create [context-name]
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#contextcreate"
      data-clipboard-text="mesheryctl system context create [context-name]" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

Example: <br/> <code class="code-block">mesheryctl system context create new-context --components meshery-istio meshery-osm meshery-linkerd --platform docker --url http://localhost:9081 --set --yes </code>
<p>2. To view the newly created meshery context use</p> 
<div id="contextviewname" class="highlight-code">
  <code class="code-box">mesheryctl system context view [context-name] 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#contextviewname"
      data-clipboard-text="mesheryctl system context view [context-name]" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

<p>3. After making these changes, you can switch between different context by using </p>
<div id="contextswitch" class="highlight-code">
  <code class="code-box">mesheryctl system context switch 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#contextswitch"
      data-clipboard-text="mesheryctl system context switch" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>


<h3>Switching between Meshery release channels using mesheryctl.</h3>
<p>mesheryctl is a command-line tool for managing Meshery. You can use it to switch between different release channels. Here's how:</p>
<ul><li> Run the following command to see the current configuration for Meshery: </li>
<br/>
<div id="contextview" class="highlight-code">
  <code class="code-box">mesheryctl system context view 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#contextview"
      data-clipboard-text="mesheryctl system context view" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>


<div style="text-align:center">
<img src="/assets/images/posts/2023/2023-06-16-changing-meshery-release-channels/meshery-version.png" className="image-center"  style="width:50%;"  alt="Meshery Version" />
</div>
<p>This will show you the currently channels ,<b>stable</b> or <b>edge</b>, along with the version number and other information.</p>
<li> Run the following command to switch to a different release channel:
</li>
<br/>
<div id="channelswitch" class="highlight-code">
  <code class="code-box">mesheryctl system channel switch
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelswitch"
      data-clipboard-text="mesheryctl system channel switch" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

<p>
This command will update your meshconfig file to switch release channel and version of context in focus. To switch the channel to a specific version, replace <b>Version</b> with the desired version number.</p>
<li> To confirm that the channel has been changed, run the following command again:</li>
<br/>
<div id="channelview" class="highlight-code">
  <code class="code-box">mesheryctl system channel view 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelview"
      data-clipboard-text="mesheryctl system channel view" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div> 
</ul>

<h2>Conclusion </h2>

<p>
  Switching between Meshery release channels is a simple and straightforward process. You can do it using mesheryctl or by switching between your meshconfig file. Whether you want stable updates or bleeding-edge features, Meshery has a release channel that suits your needs. Just remember to carefully consider your use case and needs before making any changes to ensure that you have the best Meshery experience.
</p>
