// Single source of truth for portfolio content. The windowed apps and the
// terminal both read from here, so an edit shows up everywhere.

export const profile = {
  name: 'Joseph Sanchez',
  role: 'Software Engineer',
  focus: 'Cloud & Backend Systems',
  tagline: 'You learn nothing from winning and everything from losing.',
  photo: './photo.png',
  email: 'joeychez23@outlook.com',
  phone: '+1 (425) 209-8421',
  location: 'Bothell, WA',
  bio: 'Skilled Software Engineer with experience developing cloud infrastructure using AWS/Terraform, along with developing applications in Spring, React, and Webpack. Proficient in multiple programming languages, including Java, JavaScript, Python, and C#. Adept at developing backend infrastructure, integrating secure authentication, and contributing to content management systems. Looking to leverage my skills to contribute to innovative projects and integrate myself into a robust team where I can learn from my peers and continue my journey as a Software Engineer.',
};

export const highlights = [
  {
    id: 'experience',
    title: 'Experience',
    lines: ['3+ years of professional development experience'],
  },
  {
    id: 'education',
    title: 'Education',
    lines: [
      'Full-Stack Development Certification, University of Washington',
      'Computer Programming, Cloud Architecture, Self-Taught',
    ],
  },
  {
    id: 'certifications',
    title: 'Certifications',
    lines: ['AWS Certified Solutions Architect – Associate', 'AWS Certified Cloud Practitioner'],
  },
];

// Work history from the resume, in the order shown on the Work page. Each company lists
// its roles newest first.
export const work = [
  {
    company: 'Sinclair Broadcast Group',
    location: 'Seattle, WA',
    recommendation: { author: 'Chris Taylor', title: 'Senior Technical Director' },
    roles: [
      {
        title: 'Software Engineer II',
        start: 'August 2023',
        end: 'June 2024',
        points: [
          'Helped design and develop interactive ATSC 3.0 broadcast applications with React, Node.js, and Canvas, creating an immersive and engaging experience to spearhead enterprise broadcast applications.',
          'Built and maintained backend systems with Node.js and SQL/DynamoDB powered by AWS. Provisioned infrastructure with Terraform and streamlined deployments through CI/CD pipelines.',
          'Designed and deployed robust AWS Lambda functions that handle user traffic in tandem with API Gateway.',
          'Collaborated in an Agile team to diagnose and resolve deep-rooted platform issues, enhancing stability and maintainability.',
        ],
        tech: ['React', 'Node.js', 'Canvas', 'SQL', 'DynamoDB', 'Lambda', 'API Gateway', 'Terraform', 'CI/CD'],
      },
      {
        title: 'Software Engineer I',
        start: 'March 2023',
        end: 'August 2023',
        points: [
          'Developed a Java Spring data migration service, automating the transfer of millions of SQL records from production to lower environments.',
          "Debugged and designed features in an Agile team to improve the readability and sustainability of Sinclair's Storyline CMS using Java, Spring, and SQL, while implementing and maintaining OOP best practices.",
        ],
        tech: ['Java', 'Spring', 'SQL', 'OOP'],
      },
    ],
  },
  {
    company: 'Tilosi',
    location: 'Bothell, WA',
    roles: [
      {
        title: 'Software Developer',
        start: 'June 2024',
        end: 'December 2025',
        points: [
          'Worked with peers to build core simulation systems for Towns and Wilds using C#, .NET 5, WPF, and a 1024x1024 pixel canvas, providing an immersive and engaging gameplay experience.',
          'Developed and maintained scalable C#/.NET microservices and RESTful APIs handling persistent game updates and dynamic environment processes.',
          'Helped develop and implement AI-driven zone systems with behavior trees, procedural generation, and dynamic environment mechanics.',
        ],
        tech: ['C#', '.NET 5', 'WPF', 'Microservices', 'RESTful APIs'],
      },
    ],
  },
];

export const skills = [
  { name: 'JavaScript', level: 97 },
  { name: 'Node.js', level: 97 },
  { name: 'Git/GitHub', level: 97 },
  { name: 'React', level: 94 },
  { name: 'Lambda', level: 93 },
  { name: 'DynamoDB', level: 93 },
  { name: 'AWS', level: 91 },
  { name: 'Java', level: 87 },
  { name: 'MongoDB', level: 85 },
  { name: 'Spring', level: 83 },
  { name: 'SQL', level: 81 },
  { name: 'OOP', level: 81 },
];

export const tools = [
  'JavaScript', 'Java', 'Python', 'C#', 'React', 'Node.js', 'Webpack', 'Spring',
  'GraphQL', 'Jest', 'Git', 'GitHub/GitLab', 'CI/CD', 'Terraform', 'EC2 (Linux)', 'ALB',
  'Auto Scaling', 'S3', 'CloudFront', 'API Gateway', 'Lambda', 'Route 53',
];

export const projects = [
  {
    slug: 'chess',
    title: 'Chess',
    description: 'An immersive chess game that leverages HTML5 canvas. Uses AWS CloudFront and S3 for seamless content delivery and efficient storage management, along with AWS Lambda functions for the backend.',
    tech: ['Webpack', 'Lambda', 'DynamoDB'],
    image: './chess.jpg',
    link: 'https://chess.aws-prac-route53.com/',
  },
  {
    slug: 'city',
    title: 'City Builder',
    description: 'A city builder written with three.js and Vite.',
    tech: ['Vite', 'three.js', 'MongoDB'],
    image: './city-builder.png',
    link: 'https://city-builder.aws-prac-route53.com/',
  },
  {
    slug: 'tone-radar',
    title: 'Tone Radar',
    description: 'Write an email or Slack message and every sentence gets a heat score for passive-aggression, blame, hedging, and unclear asks. Then apply a rewrite that JEV has checked to be cooler, keep your meaning, and read naturally.',
    tech: ['Nginx', 'JavaScript', 'MongoDB', 'JEV'],
    image: './radar.jpg',
    link: 'https://tone-radar.aws-prac-route53.com/',
  },
  {
    slug: 'triage',
    title: 'Triage',
    description: 'Triage searches LinkedIn, Indeed, and Glassdoor at once, merges duplicate postings, X-rays every posting for what job',
    tech: ['JEV', 'React', 'MongoDB', 'Apify'],
    image: './triage.png',
    link: 'https://triage.aws-prac-route53.com/',
  },
    {
    slug: 'aws-lambdas',
    title: 'Lambda',
    description: 'Backend Lambdas and Terraform supporting the inquiry service and the Chess application.',
    tech: ['JavaScript', 'Lambda', 'Terraform'],
    image: './lambdas.png',
    link: 'https://github.com/Joeychez23/Lambdas/',
  },
  {
    slug: 'alb-terraform',
    title: 'Nginx/EC2',
    description: 'A passion project for getting websites that need a server.js running over HTTPS behind an AWS Application Load Balancer and Auto Scaling group. The Bookstore app is the working example.',
    tech: ['EC2', 'ALB', 'Terraform', 'Nginx'],
    image: './Terraformaws.jpg',
    link: 'https://github.com/Joeychez23/AWS-Notes-Terraform/',
  },
  {
    slug: 'auth0',
    title: 'Auth0 Examples',
    description: 'Auth0 examples for client-side integration, internal infrastructure, and Auth0 Console runtime scripts.',
    tech: ['Auth0', 'Lambda', 'Security'],
    image: './Auth0.png',
    link: 'https://github.com/Joeychez23/Auth0/',
  },
  {
    slug: 'data-migration',
    title: 'Data Migration',
    description: 'A Java-based service using Spring Core that migrates hundreds of millions of rows of data into lower environments.',
    tech: ['Java', 'Spring Core', 'SQL'],
    image: './migrate.jpg',
  },
  {
    slug: 'lakeside-cabin',
    title: 'Lakeside Cabin',
    description: 'A broadcast application delivered over the air, allowing Sinclair to broaden its goals beyond traditional over-the-air broadcasting.',
    tech: ['Webpack', 'jQuery', 'OOP'],
    image: './cabin.jpg',
  },
  // {
  //   slug: 'leetcode',
  //   title: 'LeetCode',
  //   description: 'My LeetCode profile.',
  //   tech: ['Data Structures', 'Java', 'JavaScript'],
  //   image: './leetcode.jpg',
  //   link: 'https://leetcode.com/u/jbsanchez23/',
  // },
  // {
  //   slug: 'gists',
  //   title: 'GitHub Gists',
  //   description: 'Simple data structures and algorithms.',
  //   tech: ['Data Structures', 'Algorithms', 'JavaScript'],
  //   image: './Gist.png',
  //   link: 'https://gist.github.com/Joeychez23/',
  // },
  // {
  //   slug: 'devhub',
  //   title: 'DevHub',
  //   description: 'A site where developers can browse, find inspiration, and collaborate with other developers on posted projects.',
  //   tech: ['GraphQL', 'JavaScript', 'MongoDB', 'S3'],
  //   image: './Graphql.png',
  //   link: 'https://github.com/Joeychez23/DevHub',
  // },
  // {
  //   slug: 'gravity-ball',
  //   title: 'Gravity Ball',
  //   description: 'Showcases basic ball-bounce physics using HTML5 Canvas.',
  //   tech: ['Canvas', 'JavaScript'],
  //   image: './ball.jpg',
  //   link: 'https://ball.aws-prac-route53.com',
  // },
];

export const social = [
  { site: 'GitHub', handle: 'joeychez23', link: 'https://github.com/joeychez23' },
  { site: 'LinkedIn', handle: 'joseph-sanchez', link: 'https://www.linkedin.com/in/joseph-sanchez-b93b2b237/' },
  { site: 'LeetCode', handle: 'jbsanchez23', link: 'https://leetcode.com/u/jbsanchez23/' },
];

export const documents = {
  resume: { title: 'Resume.pdf', file: './Resume.pdf' },
  recommendation: { title: 'Letter of Recommendation.pdf', file: './Letter_of_Recommendation-compressed.pdf' },
};

export function findProject(query) {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  const index = Number(q);
  if (Number.isInteger(index) && index >= 1 && index <= projects.length) return projects[index - 1];
  return (
    projects.find((p) => p.slug === q) ??
    projects.find((p) => p.title.toLowerCase() === q) ??
    projects.find((p) => p.slug.startsWith(q) || p.title.toLowerCase().startsWith(q))
  );
}
