---
layout: page
title: "Mentorship Programs"
permalink: /community/handbook/programs
description:  "Explore the mentorship programs Meshery participates in and how to join."
programs:
- id: 1
  name: "Meshmates"
  description: >
    Meshery MeshMates are committed to helping community members be successful contributors. MeshMates aid in identifying areas of projects to engage within, working groups to join, and in helping community members grow in their open source and cloud native knowledge. By connecting one-on-one, MeshMates will share tips on how to have the best community experience possible.
  link: "/community/meshmates"
  icon: "/assets/images/meshmate-icon.svg"
  imagePosition: "straight"

- id: 2
  name: "Google Season of Docs"
  description: >
    Google Season of Docs provides support for open source projects to improve their documentation and allows professional technical writers to gain experience in open source. This is to raise awareness of open source, docs, and technical writing. Google season of docs started in 2019. Each year, Meshery submits a new project idea for technical writers to contribute to for a particular period. Also, stipends are awarded to the contributors.
  link: "/programs/gsod/2021"
  icon: "https://layer5.io/static/gsod-bdae86e80935b6dc17caa4239c795ecc.webp"
  imagePosition: "reverse"

- id: 3
  name: "Google Summer of Code"
  description: >
    Google Summer of Code is a global program focused on bringing more student developers into open source software development. Students work with an open-source organization on a 10-week programming project during their break from school. Every Summer, Meshery submits a new project idea for student developers to contribute to for a particular period. Also, stipends are awarded at the end of the program to the contributors.
  link: "/programs/gsoc/2025"
  icon: "/assets/images/programs/gsoc-icon-color.svg"
  imagePosition: "straight"

- id: 4
  name: "Cloud Native Computing Foundation"
  description: >
    The Cloud Native Computing Foundation (CNCF) hosts critical components of the global technology infrastructure. CNCF brings together the world’s top developers, end users, and vendors and runs the largest open source developer conferences. CNCF is part of the nonprofit Linux Foundation. 
  link: "/programs/meshery/cncf"
  icon: "/assets/images/programs/cncf-icon-color.svg"
  imagePosition: "reverse"

- id: 5
  name: "Linux Foundation"
  description: >
    The Linux Foundation (Mentorship Programs) are designed to help developers with the necessary skills–many of whom are first-time open source contributors–experiment, learn, and contribute effectively to open source communities. Meshery, as an organization, has been participating in the Linux Foundation mentorship program since 2019.
  link: "/programs/lfx/2025"
  icon: "/assets/images/programs/lfx-icon-color.svg"
  darkIcon: "/assets/images/programs/lfx-icon-white.svg"
  imagePosition: "straight"

- id: 6
  name: "MLH Fellowship Program"
  description: >
    The MLH Fellowship is a 12-week internship alternative for students interested in becoming software engineers. Instead of an internship at a single company, you'll contribute to the type of Open Source projects that every company depends on. The programs pair fun, educational curriculum with practical experience that you can put on your resume right away. It's collaborative, remote, and happens under the guidance of expert mentors. Meshery, as an organization, participates in the program by submitting a project idea for contributors to work on and also provides mentorship during the time phase given.
  link: "/programs/mlh"
  icon: "/assets/images/programs/mlh-icon-color.svg"
  darkIcon: "/assets/images/programs/mlh-icon-dark.svg"
  imagePosition: "reverse"
---

<div class="mentorship-program-list">
    {% for program in page.programs %}
        <div class="mentorship-program {% if program.imagePosition == 'reverse' %}reverse-order{% endif %}">
            <div class="program-body">
                <article class="program-details">
                  <h3 class="program-title">
                      {{ program.name }}
                  </h3>
                  <p class="program-description">
                      {{ program.description }}
                  </p>
                </article>
                <a class="highlight" href="{{ program.link }}">
                      Learn More
                </a>
            </div>
            <div class="program-icon-div">
                <img src="{{ program.icon }}" alt="{{ program.name }}" class="program-icon"
                {% if program.darkIcon %}
                  id="logo-dark-light"
                  data-logo-for-light="{{ program.icon }}"
                  data-logo-for-dark="{{ program.darkIcon }}"
                {% endif %}>
            </div>
        </div>
    {% endfor %}
</div>