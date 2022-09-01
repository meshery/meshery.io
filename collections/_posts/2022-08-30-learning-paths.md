---
date: 2022-08-30T05:00:00-13:00
title: Layer5 Learning Paths
categories:
  - Learning Paths
layout: post
permalink: "/blog/layer5-learning-paths/"
---


<style>
    .text-container h2 {
        font-size: 2em;
        text-align: left;
    }
    .text-container p {
        font-weight: 500;
        line-height: 1.5em;
    }
</style>

<div class="text-container">
    <img src="../../../images/posts/2022-08-30-learning-paths/learning-paths.png" alt="layer5-learning-paths">
    <header>
        {% if page.description %}
            <p class="subtext">{{ blog.description }}</p>
        {% endif %}
    </header>

    <br>
    <p>If you're seeking an introduction to the world of service meshes and how to create and maintain applications using them, this article is for you.</p>
    <br>
    <p>This article introduces a hands-on <a href="https://layer5.io/learn/learning-paths">Learning path</a> for application architects and developers launched by the Layer5 Community. This learning route assumes you have some background knowledge of cloud, microservices, containers, and Docker. Since cloud-native apps built on microservices are the main topic of this entire course, within these learning paths are a collection of carefully curated training resources to help you advance your general understanding of cloud-native networking and your service mesh-specific skills.</p>
    <p>The Learning Path is an initiative developed to help enlighten and test your knowledge on service meshes and management of the workloads that you&apos;ll build atop of them. As a light Learning Management System, Layer5 Learning Paths offer cloud-native training and certification through the lens of role-based paths with interactive labs intertwined through the chapters. It comprises courses that are hand-curated by the maintainers at Layer5 to equip you with the foundational tools like <a href="https://meshery.io/">Meshery</a> that assists you in comprehending service mesh concepts.</p>


    <br>
    <h2>Learning Path Options</h2>
    <p>Depending on your role as a developer, operator, or security engineer, you can choose the learning path most relevant to your everyday focus. This learning path currently has two focus areas for you to explore.</p>

    <ul>
        <li><a href="https://layer5.io/learn/learning-paths/mastering-service-meshes-for-developers">Mastering Service Meshes For Developers</a><br>This introductory course in the Learning Path focuses on Developers and what they need to know to successfully design workloads for a service mesh environment.</li>
        <li><a href="https://layer5.io/learn/learning-paths/mastering-service-meshes-for-developers">Mastering Service Meshes For Developers</a><br>This advanced learning path teaches you how to set up a service mesh and control its workloads. However, this course is still in development. 
        </li>
    </ul>


    <br>
    <p>The <a href="https://layer5.io/community">Layer5 community</a> believes that the growth of an individual user and contributor will impact the community&apos;s development. Hence, these courses are all carefully selected to help you learn service mesh the right way from experts on Service Meshes in Layer5. This Learning Path/Certification course, in addition to the available mesh training resources, is designed to take a developer from a novice in service mesh to an advanced Service Mesh Practitioner.</p>

    <h2>Learning Paths Architecture</h2>
    <img src="../../../images/posts/2022-08-30-learning-paths/mastering-meshes.png" alt="learning-paths-architecture">
    <p>This learning path / Certification project is still in its earliest phases, and so currently, only one learning path is currently available: <a href="https://layer5.io/learn/learning-paths/mastering-service-meshes-for-developers">Mastering Service Meshes For Developers</a>.
        It comprises two courses in length; <a href="https://layer5.io/learn/learning-paths/mastering-service-meshes-for-developers/introduction-to-service-meshes">introduction to Service Meshes</a> an  and an <a href="https://layer5.io/learn/learning-paths/mastering-service-meshes-for-developers/advance-concepts-of-service-mesh">introduction to the advanced concepts of Service Meshes</a>, with ~8 chapters per course.  The courses in this learning path focus on the fundamentals of Service Meshes and use <a href="https://meshery.io/">Meshery</a> as the management plane in managing the service meshes. You will discover eight to nine streamlined chapters in each course that will assist developers with installing Meshery, deploying apps, and maintaining service meshes using Meshery. 
    </p>

    <img src="../../../images/posts/2022-08-30-learning-paths/courses.png" alt="">

    <h2>Service Mesh Supported</h2>
    <p>This learning path supports two outstanding service meshes, Istio and Linkerd. Users can choose the service mesh they want to study in each learning path. You can learn the principles of several service meshes independently by clicking a button.</p>

    <img src="../../../images/posts/2022-08-30-learning-paths/service-meshes.png" alt="">

    <h2>What will I learn in this course?</h2>
    <p>The learning path contains a range of topics from the basics to advanced topics on services meshes and the role Meshery plays as a cloud-native management plane. By the end of this learning path, you will have the knowledge and confidence on how to:
        <ul>
            <li>Deploy an application using service meshes(Istio & Linkerd).</li>
            <li>Expose services using ingress gateway for different service meshes.</li>
            <li>Understand how service mesh performance is used to measure for Observability in your system.</li>
            <li>With Routing and canary, you will get your hands on some of the traffic management capabilities for different service meshes.</li>
            <li>You will discover how to use systematic defects to assess an application's resilience.</li>
            <li>You will learn more about Service security capabilities and how that work.</li>
            <li>Experience huge performance improvements using Webassembly and intelligent data planes.</li>
        </ul>
    </p>

    <h3>This course is for you if…</h3>
    <p>
        <ul>
            <li>...you want to gain a clear and advanced understanding of Service Meshes.</li>
            <li>...you have been trying to learn and understand service mesh but still don't understand.</li>
            <li>…you are an application architect or developer.</li>
            <li>…you already understand service meshes and are looking for a course to cover advanced topics. This learning path also includes expert topics!</li>
        </ul>
    </p>
    
    <h2>What&apos;s next?</h2>
    <p>The upcoming phases of this learning Path/certification will focus on capturing users&apos; data to help track progress on each learning path. Multiple learning paths, interactive labs, and quizzes will test participants' knowledge and award them a certificate upon completion of a learning path. Maintainers and contributors are working towards implementing some of these features in future releases. Some of the core features to expect:
        <ul>
            <li>Multiple Learning Paths.</li>
            <li>User Account</li>
            <li>Bookmarking/Progression tracking</li>
            <li>Quizzes and grades</li>
            <li>Certificate of Completion </li>
        </ul>
    </p>

    <h2>Conclusion</h2>
    <p>Layer5 is a creator and maintainer of service mesh standards and this makes it the best place for you to gain this knowledge.  One of our fantastic initiatives is the interactive practice labs, which let you study while you explore services meshes on your browser. As the primary developers of the cloud native management plane, Meshery, our maintainers are readily available to answer your questions, should in case you have any. 
        The Learning paths are now available on the <a href="https://layer5.io/learn/learning-paths">Layer5 site</a>. Feel free to take these courses and try out the hands-on tutorials. If you encounter any bugs while taking these courses, kindly report by <a href="https://github.com/layer5io/layer5/issues">creating an issue</a>; you can also join the <a href="https://layer5io.slack.com/archives/C015QJKUMPU">#Website Slack channel</a> if you wish to contribute.</p>    
</div>