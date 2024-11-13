import React from 'react';

const skillsData = [
  {
    title: "Computer Skills",
    imgSrc: "src/images/computer/computer.jpg",
    description: "Learn the essentials of computer basics, coding, and graphic design to boost your digital skills",
    link: "computer.html"
  },
  {
    title: "Fashion Design",
    imgSrc: "images/fashion/fashion.jpg",
    description: "Learn the art of designing clothing and accessories, from sketching to garment creation.",
    link: "fashion.html"
  },
  {
    title: "Catering",
    imgSrc: "images/catering.png",
    description: "Gain expertise in culinary skills and food preparation for events and businesses.",
    link: "#read-more"
  },
  {
    title: "Knitting",
    imgSrc: "images/kneating.PNG",
    description: "Master the techniques of knitting to create beautiful garments and accessories.",
    link: "#read-more"
  },
  {
    title: "Local Weaving",
    imgSrc: "images/local veaving.PNG",
    description: "Learn the traditional art of weaving fabrics, from raw materials to finished products.",
    link: "#read-more"
  },
  {
    title: "Ear Ring Making",
    imgSrc: "images/ear ring.PNG",
    description: "Discover the craft of creating unique, handmade earrings and accessories.",
    link: "#read-more"
  },
  {
    title: "Shoe Cobbling",
    imgSrc: "images/shoe cobbling.PNG",
    description: "Learn the essential skills of shoe repair, design, and custom craftsmanship.",
    link: "#read-more"
  },
  {
    title: "Hair Dressing",
    imgSrc: "images/hair dressing",
    description: "Train to become a professional hair stylist with hands-on experience in cutting, styling, and more.",
    link: "#read-more"
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <h2>Our Skills Programs</h2>
      <div className="skills-list">
        {skillsData.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-img">
              <img src={skill.imgSrc} alt={skill.title} />
            </div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <a href={skill.link} className="btn">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
