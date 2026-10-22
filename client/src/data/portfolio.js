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
  bio: 'Skilled Software Engineer with experience developing cloud infrastructure using AWS/Terraform, along with developing applications in Spring, React, .NET, and three.js. Proficient in multiple programming languages, including Java, JavaScript, Python, and C#. Adept at developing backend infrastructure, integrating secure authentication, building simulation systems, and contributing to content management systems. Looking to leverage my skills to contribute to innovative projects and integrate myself into a robust team where I can learn from my peers and continue my journey as a Software Engineer.',
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
    company: 'Personal Projects',
    location: 'Bothell, WA',
    roles: [
      {
        title: 'Independent Software Development',
        start: 'December 2025',
        end: 'Present',
        points: [
          'Design, build, and deploy full-stack web applications end to end, including City Builder, Chess, Triage, and Tone Radar (see Projects), each live on its own subdomain.',
          'Provision AWS hosting with Terraform: S3 + CloudFront static sites, Lambda functions behind API Gateway, and Nginx on EC2 behind an Application Load Balancer and Auto Scaling group, with Route 53 DNS and ACM certificates.',
          'Integrate AI models and third-party services, including TypeSafe Jev for text scoring and job ranking, Apify for job-board scraping, and JWT and Auth0 for authentication.',
          'Practice data structures and algorithms on LeetCode, with 551 problems solved in total (258 Medium, 22 Hard), mostly in JavaScript and Java.',
        ],
        tech: ['Terraform', 'S3 + CloudFront', 'Lambda', 'API Gateway', 'EC2', 'Nginx', 'ALB', 'Route 53', 'TypeSafe Jev', 'Apify', 'JWT', 'Auth0'],
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
    title: 'Chess (work in progress)',
    description: 'A chess game drawn on HTML5 Canvas with a computer opponent and email challenges, served from S3 + CloudFront on a Route 53 domain. Every move is re-validated by a Node.js Lambda behind API Gateway against the board stored in DynamoDB; all infrastructure is provisioned with Terraform.',
    tech: ['Canvas', 'Webpack', 'Lambda', 'DynamoDB', 'Terraform', 'Stockfish'],
    image: './chess.jpg',
    link: 'https://github.com/Joeychez23/Chess',
  },
  {
    slug: 'city',
    title: 'City Builder (work in progress)',
    description: 'A 3D city-building game in three.js, built with Claude Code (about 25,000 lines of JavaScript), with a road network of curved segments, A* trip routing, and lane-level traffic that queues at traffic lights, give-way junctions, and roundabouts. Simulates zoning, building growth, utilities, and a production-chain economy across 13 procedurally generated island maps, with compact saves and an Express/MongoDB account API with JWT auth.',
    tech: ['three.js', 'Vite', 'Express', 'MongoDB'],
    image: './city-builder.png',
    link: 'https://city-builder.aws-prac-route53.com/',
  },
  {
    slug: 'tone-radar',
    title: 'Tone Radar',
    description: 'A PWA that scores every sentence of an email for passive-aggression, blame, hedging, and unclear asks, and suggests rewrites that an AI model checks keep the original meaning.',
    tech: ['React', 'Express', 'MongoDB', 'TypeSafe Jev'],
    image: './radar.jpg',
    link: 'https://tone-radar.aws-prac-route53.com/',
  },
  {
    slug: 'triage',
    title: 'Triage',
    description: 'A job search that runs LinkedIn, Indeed, and Glassdoor scrapers in parallel, merges duplicate postings, and ranks every posting by fit with an AI model. JWT auth, resume upload and parsing (PDF/DOCX), rate limiting, and Helmet security headers on an Express 5 API.',
    tech: ['React', 'Express', 'MongoDB', 'Apify', 'TypeSafe Jev'],
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
    slug: 'jev-pg',
    title: 'Jev Playground',
    description: 'A small website for trying TypeSafe\'s Jev model: write a state (text or JSON), define [Bool / Choice / Score] questions, and see typed answers, probabilities, and confidence.',
    tech: ['Node', 'TypeSafe Jev'],
    image: './jev-playground.png',
    link: 'https://github.com/Joeychez23/Jev-Playground',
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
