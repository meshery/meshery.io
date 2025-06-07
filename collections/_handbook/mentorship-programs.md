---
layout: page
title: "Mentorship Programs"
permalink: /community/handbook/mentorship-programs
description:  "Explore the mentorship programs Meshery participates in and how to join."
programs:
- id: 1
  name: "Meshmates"
  description: >
    Layer5 MeshMates are committed to helping community members be successful contributors. MeshMates aid in identifying areas of projects to engage within, working groups to join, and in helping community members grow in their open source and cloud native knowledge. By connecting one-on-one, MeshMates will share tips on how to have the best community experience possible.
  link: "https://layer5.io/community/meshmates"
  icon: "/assets/images/meshmate-icon.svg"
  imagePosition: "straight"

- id: 2
  name: "Google Season of Docs"
  description: >
    Google Season of Docs provides support for open source projects to improve their documentation and allows professional technical writers to gain experience in open source. This is to raise awareness of open source, docs, and technical writing. Google season of docs started in 2019. Each year, layer5 submits a new project idea for technical writers to contribute to for a particular period. Also, stipends are awarded to the contributors.
  link: "https://meshery.io/programs/gsod/2021"
  icon: "/assets/images/programs/gsod.svg"
  imagePosition: "reverse"

- id: 3
  name: "Google Summer of Code"
  description: >
    Google Summer of Code is a global program focused on bringing more student developers into open source software development. Students work with an open-source organization on a 10-week programming project during their break from school. Every Summer, Layer5 submits a new project idea for student developers to contribute to for a particular period. Also, stipends are awarded at the end of the program to the contributors.
  link: "https://meshery.io/programs/gsoc/2025"
  icon: "/assets/images/programs/gsoc.svg"
  imagePosition: "straight"

- id: 4
  name: "Cloud Native Computing Foundation"
  description: >
    The Cloud Native Computing Foundation (CNCF) hosts critical components of the global technology infrastructure. CNCF brings together the world’s top developers, end users, and vendors and runs the largest open source developer conferences. CNCF is part of the nonprofit Linux Foundation. 
  link: "https://meshery.io/programs/meshery/cncf"
  icon: "/assets/images/programs/cncf-icon-white.svg"
  imagePosition: "reverse"

- id: 5
  name: "Linux Foundation"
  description: >
    The Linux Foundation (Mentorship Programs) are designed to help developers with the necessary skills–many of whom are first-time open source contributors–experiment, learn, and contribute effectively to open source communities. Layer5, as an organization, has been participating in the Linux Foundation mentorship program since 2019.
  link: "https://meshery.io/programs/lfx/2025"
  icon: "/assets/images/programs/lfx-logo.svg"
  imagePosition: "straight"

- id: 6
  name: "MLH Fellowship Program"
  description: >
    The MLH Fellowship is a 12-week internship alternative for students interested in becoming software engineers. Instead of an internship at a single company, you'll contribute to the type of Open Source projects that every company depends on. The programs pair fun, educational curriculum with practical experience that you can put on your resume right away. It's collaborative, remote, and happens under the guidance of expert mentors. Layer5, as an organization, participates in the program by submitting a project idea for contributors to work on and also provides mentorship during the time phase given.
  link: "https://meshery.io/programs/mlh"
  icon: "/assets/images/programs/mlh-logo-white.svg"
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
                <a href="{{ program.link }}">
                    <button class="learn-more-button" type="button" title="Learn more">
                      Learn More
                    </button>
                </a>
            </div>
            <div class="program-icon-div">
                <img src="{{ program.icon }}" alt="{{ program.name }}" class="program-icon">
            </div>
        </div>
    {% endfor %}
</div>

<style>
.mentorship-program-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh 0px;
}

.mentorship-program {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 4vh 0vw;
}

.mentorship-program > * { 
  margin: 2vh 2vw;
}

.program-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.program-body > * {
  margin: 2vh 0px;
}

.program-details {
  margin: 1vh 0px;
}

.program-title {
  padding: 0;
}

.learn-more-button {
  color: white;
  font-size: 1rem;
  padding: 0.25em 0.75em;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--action-color-dark)
}

.program-icon-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: clamp(128px, 8vw, 800px);
  width: auto;
  max-width: 75%;
}

.program-icon {
  height: 100%;
  width: 100%;
  margin: 0px 10vw;
  object-fit: contain;
  filter: drop-shadow(0px 0px 18px rgba(0 0 0 0.3));
}

@media (min-width: 768px) {
  .mentorship-program {
    flex-direction: row;
  }

  .reverse-order {
    flex-direction: row-reverse;
  }

  .program-body {
    flex:2;
  }

  .program-icon-div {
    flex: 1;
  }

  .program-icon {
    margin: 2vw 2vw;
  }
}
</style>
