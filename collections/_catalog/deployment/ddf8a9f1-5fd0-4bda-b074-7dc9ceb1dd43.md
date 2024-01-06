---
layout: item
name: Istio BookInfo Application
userId: 173202fe-b94d-4064-8a86-1cf063732884
userName: Ashish Tiwari
userAvatarURL: https://layer5.io/static/7b1f08e10d271cbfd963c7d435cf84ac/416c3/ashish-tiwari.webp
type: deployment
compatibility: 
        - Kubernetes
        - Istio
patternId: ddf8a9f1-5fd0-4bda-b074-7dc9ceb1dd43
image: https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/ddf8a9f1-5fd0-4bda-b074-7dc9ceb1dd43.png
patternInfo: |
  This design deploys Istio BookInfo App. \nThe Bookinfo application is broken into four separate microservices: \nproductpage. The productpage microservice calls the details and reviews microservices to populate the page. \ndetails. The details microservice contains book information. \nreviews. The reviews microservice contains book reviews. It also calls the ratings microservice. \nratings. The ratings microservice contains book ranking information that accompanies a book review.
patternCaveats: |
  Networking should be properly configured to enable communication between the different services of the app
URL: 'https://raw.githubusercontent.com/meshery/meshery.io/master/catalog/ddf8a9f1-5fd0-4bda-b074-7dc9ceb1dd43.yaml'
downloadLink: ddf8a9f1-5fd0-4bda-b074-7dc9ceb1dd43.yaml
---
