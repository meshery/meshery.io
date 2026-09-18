[1mdiff --git a/Gemfile.lock b/Gemfile.lock[m
[1mindex d695b7665..53559d653 100644[m
[1m--- a/Gemfile.lock[m
[1m+++ b/Gemfile.lock[m
[36m@@ -19,6 +19,7 @@[m [mGEM[m
     ffi (1.17.4-arm-linux-gnu)[m
     ffi (1.17.4-arm-linux-musl)[m
     ffi (1.17.4-arm64-darwin)[m
[32m+[m[32m    ffi (1.17.4-x64-mingw-ucrt)[m
     ffi (1.17.4-x86-linux-gnu)[m
     ffi (1.17.4-x86-linux-musl)[m
     ffi (1.17.4-x86_64-darwin)[m
[36m@@ -37,6 +38,9 @@[m [mGEM[m
     google-protobuf (4.34.1-arm64-darwin)[m
       bigdecimal[m
       rake (~> 13.3)[m
[32m+[m[32m    google-protobuf (4.34.1-x64-mingw-ucrt)[m
[32m+[m[32m      bigdecimal[m
[32m+[m[32m      rake (~> 13.3)[m
     google-protobuf (4.34.1-x86-linux-gnu)[m
       bigdecimal[m
       rake (~> 13.3)[m
[36m@@ -139,6 +143,8 @@[m [mGEM[m
       google-protobuf (~> 4.31)[m
     sass-embedded (1.99.0-riscv64-linux-musl)[m
       google-protobuf (~> 4.31)[m
[32m+[m[32m    sass-embedded (1.99.0-x64-mingw-ucrt)[m
[32m+[m[32m      google-protobuf (~> 4.31)[m
     sass-embedded (1.99.0-x86_64-darwin)[m
       google-protobuf (~> 4.31)[m
     sass-embedded (1.99.0-x86_64-linux-android)[m
[36m@@ -173,6 +179,7 @@[m [mPLATFORMS[m
   riscv64-linux-gnu[m
   riscv64-linux-musl[m
   ruby[m
[32m+[m[32m  x64-mingw-ucrt[m
   x86-cygwin[m
   x86-linux[m
   x86-linux-android[m
[1mdiff --git a/_includes/getting-started.html b/_includes/getting-started.html[m
[1mindex eb13fabb0..a3be9a3f5 100644[m
[1m--- a/_includes/getting-started.html[m
[1m+++ b/_includes/getting-started.html[m
[36m@@ -334,7 +334,7 @@[m [mmesheryctl system start" %}[m
         <h1 class="step-number" style="margin-right: 0.5rem">02</h1>[m
         <h2 class="step-heading">Manage your Cloud Native Infra</h2>[m
       </div>[m
[31m-      <p class="grey-bg-text" style="margin-left: 0px; font-size: 1.15rem;">There is no step 2. Login and manage cloud native infrastructure! For more detailed instructions, visit <a href="https://docs.meshery.io/installation">Meshery Docs</a>. </p>[m
[32m+[m[32m      <p class="grey-bg-text" style="margin-left: 0px; font-size: 1.15rem;">There is no step 2. Login and manage cloud native infrastructure! For more detailed instructions, visit <a href="https://docs.meshery.io/installation" style="color: #00d3a9; font-weight: 700; text-shadow: 0 0 6px rgba(0, 211, 169, 0.5);">Meshery Docs</a>. </p>[m
     </div>[m
   </div>[m
 </div>[m
