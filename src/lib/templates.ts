export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  type: 'page' | 'post' | 'success_story';
  content: string;
  excerpt?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export const pageTemplates: PageTemplate[] = [
  {
    id: 'service-page',
    name: 'Service Page',
    description: 'Professional service page layout with features and benefits',
    type: 'page',
    content: `
<h1>Service Title</h1>
<p>Professional service description that highlights the value proposition and key benefits for your clients.</p>

<h2>Service Overview</h2>
<p>Provide a comprehensive overview of what this service includes and how it addresses specific client needs and challenges.</p>

<h2>Key Features</h2>
<ul>
<li>Feature 1: Description of the first key feature</li>
<li>Feature 2: Description of the second key feature</li>
<li>Feature 3: Description of the third key feature</li>
<li>Feature 4: Description of the fourth key feature</li>
</ul>

<h2>Benefits</h2>
<ul>
<li>Benefit 1: How clients benefit from this service</li>
<li>Benefit 2: Long-term advantages and value</li>
<li>Benefit 3: Competitive advantages</li>
</ul>

<h2>Process</h2>
<ol>
<li><strong>Discovery:</strong> Initial consultation and needs assessment</li>
<li><strong>Planning:</strong> Strategy development and roadmap creation</li>
<li><strong>Implementation:</strong> Execution of the service plan</li>
<li><strong>Review:</strong> Results evaluation and optimization</li>
</ol>

<h2>Why Choose Us</h2>
<p>Explain what makes your service unique and why clients should choose your company over competitors.</p>

<h2>Get Started</h2>
<p>Ready to transform your business? Contact us today to schedule a consultation and learn how this service can help you achieve your goals.</p>
    `,
    excerpt: 'Professional service offering comprehensive solutions for your business needs.',
    metaTitle: 'Professional Services | Augmex',
    metaDescription: 'Discover our comprehensive professional services designed to help your business thrive and succeed in today\'s competitive market.'
  },
  {
    id: 'success-story',
    name: 'Success Story',
    description: 'Case study template showcasing client success stories',
    type: 'success_story',
    content: `
<h1>Client Success Story</h1>
<p>How [Client Name] achieved remarkable results with our solutions.</p>

<h2>Client Background</h2>
<p>[Client Name] is a [industry] company facing [specific challenges]. They needed a solution to [specific problem] and were looking for a reliable partner to help them achieve their goals.</p>

<h2>The Challenge</h2>
<p>The client was struggling with [specific challenges], including [challenge 1], [challenge 2], and [challenge 3]. These issues were impacting their [business metrics] and preventing them from [business objectives].</p>

<h2>Our Solution</h2>
<p>We implemented a comprehensive solution that included [solution components]. Our approach focused on [key aspects] to address the client's specific needs and challenges.</p>

<h3>Implementation Process</h3>
<ol>
<li><strong>Assessment:</strong> Thorough analysis of client needs and current situation</li>
<li><strong>Strategy:</strong> Development of customized solution plan</li>
<li><strong>Execution:</strong> Implementation of the solution with expert guidance</li>
<li><strong>Support:</strong> Ongoing support and optimization</li>
</ol>

<h2>Results</h2>
<p>The partnership delivered outstanding results:</p>
<ul>
<li><strong>[Metric 1]:</strong> [Specific result with percentage or numbers]</li>
<li><strong>[Metric 2]:</strong> [Specific result with percentage or numbers]</li>
<li><strong>[Metric 3]:</strong> [Specific result with percentage or numbers]</li>
<li><strong>[Metric 4]:</strong> [Specific result with percentage or numbers]</li>
</ul>

<h2>Client Testimonial</h2>
<blockquote>
<p>"Working with Augmex has been transformative for our business. Their expertise and dedication helped us achieve results we never thought possible. The team's professionalism and innovative approach exceeded our expectations."</p>
<cite>- [Client Name], [Client Title]</cite>
</blockquote>

<h2>Key Takeaways</h2>
<p>This success story demonstrates how [key lessons learned]. The client's experience shows that [main insights] that other businesses can apply to their own situations.</p>
    `,
    excerpt: 'Discover how our client achieved remarkable results through our partnership and innovative solutions.',
    categories: ['Case Studies'],
    tags: ['success story', 'case study', 'results'],
    metaTitle: 'Success Story: How [Client] Achieved Remarkable Results',
    metaDescription: 'Read the inspiring success story of how our client achieved outstanding results through our strategic partnership and innovative solutions.'
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Standard blog post template with engaging structure',
    type: 'post',
    content: `
<h1>Blog Post Title</h1>
<p>Captivating introduction that hooks readers and clearly states what the post is about.</p>

<h2>Introduction</h2>
<p>Start with an engaging opening that captures the reader's attention. Present the main topic and why it matters to your audience. Set expectations for what they'll learn from this post.</p>

<h2>The Problem</h2>
<p>Describe the common problem or challenge that your readers face. Help them relate to the situation and understand why this topic is relevant to them. Use examples or scenarios they can identify with.</p>

<h2>The Solution</h2>
<p>Present your solution or insights. Break it down into clear, actionable steps or concepts. Use subheadings to organize the content and make it easy to follow.</p>

<h3>Key Point 1</h3>
<p>Detailed explanation of the first key point. Include examples, data, or case studies to support your argument.</p>

<h3>Key Point 2</h3>
<p>Detailed explanation of the second key point. Provide practical advice or strategies that readers can implement.</p>

<h3>Key Point 3</h3>
<p>Detailed explanation of the third key point. Share insights or best practices based on your experience.</p>

<h2>Best Practices</h2>
<p>Share industry best practices or tips that readers can apply immediately. These should be actionable and specific.</p>
<ul>
<li>Best practice 1 with brief explanation</li>
<li>Best practice 2 with brief explanation</li>
<li>Best practice 3 with brief explanation</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<p>Help readers avoid common pitfalls by highlighting mistakes they should steer clear of.</p>
<ul>
<li>Mistake 1 and why it's problematic</li>
<li>Mistake 2 and how to avoid it</li>
<li>Mistake 3 and better alternatives</li>
</ul>

<h2>Case Study or Example</h2>
<p>Provide a real-world example or case study that illustrates your points. This makes the content more relatable and credible.</p>

<h2>Tools and Resources</h2>
<p>Recommend tools, resources, or further reading that can help readers implement what they've learned.</p>

<h2>Conclusion</h2>
<p>Summarize the key takeaways from your post. Reinforce the main message and provide a clear call to action. Encourage readers to apply what they've learned or engage with your content further.</p>

<h2>Call to Action</h2>
<p>What should readers do next? Whether it's commenting, sharing, contacting you, or reading related content, make it clear and compelling.</p>
    `,
    excerpt: 'Comprehensive guide covering essential insights and actionable strategies for success.',
    categories: ['Blog'],
    tags: ['tips', 'guide', 'best practices'],
    metaTitle: 'Blog Post Title | Augmex Blog',
    metaDescription: 'Comprehensive guide with actionable insights and strategies to help you succeed in your endeavors.'
  },
  {
    id: 'contact-page',
    name: 'Contact Page',
    description: 'Professional contact page with multiple contact methods',
    type: 'page',
    content: `
<h1>Contact Us</h1>
<p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>

<h2>Get in Touch</h2>
<p>Ready to start your next project or have questions about our services? Reach out to us and let's discuss how we can help you achieve your goals.</p>

<h3>Office Location</h3>
<p><strong>Address:</strong><br>
123 Business Avenue<br>
Suite 100<br>
City, State 12345</p>

<p><strong>Phone:</strong> +1 (555) 123-4567<br>
<strong>Email:</strong> info@augmex.io</p>

<h3>Business Hours</h3>
<p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM<br>
<strong>Saturday:</strong> 10:00 AM - 4:00 PM<br>
<strong>Sunday:</strong> Closed</p>

<h2>Send Us a Message</h2>
<p>Fill out the form below and we'll get back to you as soon as possible. For urgent inquiries, please call us directly.</p>

<h3>What to Expect</h3>
<ul>
<li>Response within 24 hours during business days</li>
<li>Initial consultation to understand your needs</li>
<li>Customized proposal based on your requirements</li>
<li>Ongoing support throughout our partnership</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>How quickly do you respond to inquiries?</h3>
<p>We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.</p>

<h3>Do you offer free consultations?</h3>
<p>Yes, we offer a complimentary initial consultation to discuss your needs and determine how we can best assist you.</p>

<h3>What industries do you serve?</h3>
<p>We work with clients across various industries including technology, healthcare, finance, education, and more. Contact us to learn how we can help your specific industry.</p>

<h3>How do I get started?</h3>
<p>Getting started is easy! Simply fill out the contact form above or give us a call. We'll schedule an initial consultation to discuss your needs and next steps.</p>

<h2>Connect With Us</h2>
<p>Stay connected with us through social media for the latest updates, insights, and industry news.</p>

<p>Follow us on LinkedIn, Twitter, and Facebook to stay informed about our latest projects and industry insights.</p>
    `,
    excerpt: 'Contact us for professional services and consultations. We\'re here to help you achieve your business goals.',
    metaTitle: 'Contact Us | Augmex',
    metaDescription: 'Get in touch with Augmex for professional services and consultations. Contact us today to discuss your project needs.'
  },
  {
    id: 'about-page',
    name: 'About Us Page',
    description: 'Comprehensive about page with company story and values',
    type: 'page',
    content: `
<h1>About Augmex</h1>
<p>We are a team of dedicated professionals committed to delivering exceptional results and helping our clients achieve their business goals.</p>

<h2>Our Story</h2>
<p>Founded in [Year], Augmex began with a simple mission: to provide businesses with the tools, expertise, and support they need to thrive in an increasingly competitive marketplace. What started as a small team of passionate professionals has grown into a trusted partner for businesses across various industries.</p>

<p>Our journey has been marked by continuous growth, learning, and adaptation to the evolving needs of our clients. We've built our reputation on delivering consistent results, maintaining the highest standards of quality, and fostering long-term relationships with our clients.</p>

<h2>Our Mission</h2>
<p>To empower businesses with innovative solutions and expert guidance that drive growth, efficiency, and success. We believe in the potential of every business to achieve greatness, and we're committed to providing the support and expertise needed to turn that potential into reality.</p>

<h2>Our Vision</h2>
<p>To be the leading partner for businesses seeking transformation and growth, recognized for our innovation, integrity, and unwavering commitment to client success.</p>

<h2>Our Values</h2>

<h3>Excellence</h3>
<p>We pursue excellence in everything we do, from the quality of our work to the level of service we provide. We believe that attention to detail and commitment to quality are the foundations of lasting success.</p>

<h3>Integrity</h3>
<p>We operate with the highest level of integrity, maintaining transparency and honesty in all our dealings. Our clients trust us because we consistently demonstrate ethical behavior and deliver on our promises.</p>

<h3>Innovation</h3>
<p>We embrace innovation and continuously seek new and better ways to serve our clients. We stay at the forefront of industry trends and technologies to provide cutting-edge solutions.</p>

<h3>Collaboration</h3>
<p>We believe in the power of collaboration and work closely with our clients as partners. We listen, understand, and co-create solutions that address their unique challenges and opportunities.</p>

<h3>Client Success</h3>
<p>Our success is measured by our clients' success. We are deeply committed to helping our clients achieve their goals and celebrate their victories as our own.</p>

<h2>Our Team</h2>
<p>Our team consists of experienced professionals with diverse backgrounds and expertise. Each member brings unique skills and perspectives, enabling us to provide comprehensive solutions to complex challenges.</p>

<h3>Leadership Team</h3>
<p>Our leadership team combines decades of industry experience with a forward-thinking approach to business. They guide our company with vision, wisdom, and a deep commitment to our values and mission.</p>

<h3>Expertise Areas</h3>
<p>Our team members specialize in various areas including [Area 1], [Area 2], [Area 3], and [Area 4]. This diverse expertise allows us to address a wide range of business needs and challenges.</p>

<h2>Our Approach</h2>
<p>We take a structured yet flexible approach to working with clients, ensuring that we understand their unique needs and deliver solutions that are both effective and sustainable.</p>

<ol>
<li><strong>Discovery:</strong> We begin by thoroughly understanding your business, challenges, and goals.</li>
<li><strong>Strategy:</strong> We develop a customized strategy based on our findings and your objectives.</li>
<li><strong>Implementation:</strong> We execute the strategy with precision and attention to detail.</li>
<li><strong>Optimization:</strong> We continuously monitor and optimize results to ensure maximum impact.</li>
</ol>

<h2>Why Choose Us</h2>

<h3>Proven Track Record</h3>
<p>With years of experience and numerous successful projects, we have a proven track record of delivering results that exceed expectations.</p>

<h3>Customized Solutions</h3>
<p>We don't believe in one-size-fits-all approaches. Every solution is tailored to meet the specific needs and goals of our clients.</p>

<h3>Expert Team</h3>
<p>Our team consists of highly skilled professionals with deep expertise in their respective fields.</p>

<h3>Long-term Partnerships</h3>
<p>We focus on building long-term relationships with our clients, providing ongoing support and guidance as their businesses evolve.</p>

<h2>Join Us</h2>
<p>Are you passionate about helping businesses succeed? We're always looking for talented individuals who share our values and vision. Check out our careers page to learn more about current opportunities.</p>

<p>Together, we can make a difference and help businesses achieve their full potential.</p>
    `,
    excerpt: 'Learn about Augmex - our mission, values, and commitment to helping businesses achieve their goals through innovative solutions.',
    metaTitle: 'About Us | Augmex',
    metaDescription: 'Discover Augmex\'s story, mission, values, and commitment to delivering exceptional results for our clients across various industries.'
  }
];

export function getTemplateById(id: string): PageTemplate | undefined {
  return pageTemplates.find(template => template.id === id);
}

export function getTemplatesByType(type: 'page' | 'post' | 'success_story'): PageTemplate[] {
  return pageTemplates.filter(template => template.type === type);
}