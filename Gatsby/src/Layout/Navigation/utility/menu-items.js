// import meshmateLogo from "../../../assets/images/meshmate-stack.svg";
// import communityGreen from "../../../assets/images/community-green.svg";

const MenuItems = [
  {
    name: "Docs",
    path: "https://docs.meshery.io/",
  },
  {
    name: "Playground",
    path: "https://play.meshery.io/",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Community",
    subItems: [
      {
        name: "Calender",
        path: "/calender",
        sepLine: true,
      },
      {
        name: "Programs",
        path: "/programs",
        sepLine: true,
      },
      {
        name: "Mailing List",
        path: "/subscribe",
        sepLine: true,
      },
      {
        name: "Discuss",
        path: "https://discuss.layer5.io/",
        sepLine: true,
      },
      {
        name: "Github",
        path: "https://github.com/meshery",
        sepLine: true,
      },
      {
        name: "Slack",
        path: "http://slack.layer5.io",
        sepLine: true,
      },
      {
        name: "Youtube",
        path: "https://www.youtube.com/channel/UCFL1af7_wdnhHXL1InzaMvA?sub_confirmation=1",
        sepLine: true,
      },
    ],
  },
  {
    name: "Resources",
    subItems: [
      {
        name: "Service Mesh Catalog",
        path: "/catalog",
        sepLine: true,
      },
      {
        name: "Service Mesh Interface",
        path: "/service-mesh-interface",
        sepLine: true,
      },
      {
        name: "Talks and Presentations",
        path: "/talks-and-presentations",
        sepLine: true,
      },
      {
        name: "Contributing",
        path: "https://docs.meshery.io/project/contributing",
        sepLine: true,
      },
      {
        name: "Branding",
        path: "https://layer5.io/brand#meshery",
        sepLine: true,
      },
    ],
  },
];
export default MenuItems;
