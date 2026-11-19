export const BRAND = { name: 'Stackly' }

export const NAV_LINKS = [
  { to: '/', label: 'Home', icon: 'fa-house' },
  { to: '/events', label: 'Explore Events', icon: 'fa-compass' },
  { to: '/my-registrations', label: 'My Registrations', icon: 'fa-ticket' },
]

export const CATEGORIES = [
  { name: 'Technology', icon: 'fa-laptop-code', image: 'experience-1', blurb: 'Bootcamps, labs and build weekends led by working engineers.' },
  { name: 'Business', icon: 'fa-chart-line', image: 'category-business', blurb: 'Summits, clinics and founder meetups worth the commute.' },
  { name: 'Design', icon: 'fa-pen-ruler', image: 'featured-design', blurb: 'Sprints and critiques for people who care how things feel.' },
  { name: 'Education', icon: 'fa-graduation-cap', image: 'gallery-3', blurb: 'Classes, clinics and career sessions for students and teachers.' },
  { name: 'Culinary', icon: 'fa-utensils', image: 'featured-cooking', blurb: 'Hands-on kitchen classes and long-table tastings.' },
  { name: 'Art', icon: 'fa-palette', image: 'category-art', blurb: 'Painting salons, photowalks and studio hours with practising artists.' },
  { name: 'Music', icon: 'fa-guitar', image: 'category-music', blurb: 'Live sessions and open stages for listeners and players.' },
  { name: 'Wellness', icon: 'fa-spa', image: 'category-wellness', blurb: 'Breathwork, yoga and slow mornings that reset the week.' },
]

export const CATEGORY_ICON = Object.fromEntries(CATEGORIES.map((c) => [c.name, c.icon]))

export const STEPS = [
  { image: 'about-studio', icon: 'fa-magnifying-glass', title: 'Browse what is on', text: 'Filter by topic, city, price or format and see exactly how many seats remain.' },
  { image: 'about-hands', icon: 'fa-id-card', title: 'Reserve in a minute', text: 'Add your name, email and phone. No account and no payment form to wade through.' },
  { image: 'about-team', icon: 'fa-ticket', title: 'Keep your pass', text: 'Every booking gets a pass code and lives in My Registrations until the day.' },
  { image: 'experience-3', icon: 'fa-door-open', title: 'Walk in and learn', text: 'Show your code at the door, or join the link we send for online sessions.' },
]

export const STATS = [
  { value: 320, label: 'Workshops hosted' },
  { value: 18400, label: 'Seats booked' },
  { value: 12, label: 'Cities and online' },
  { value: 140, label: 'Expert hosts' },
]

export const VOICES = [
  { name: 'Meenakshi R.', role: 'Frontend developer, Madurai', image: 'testimonial-1', quote: 'I booked the design sprint on a Tuesday and shipped a prototype by Sunday. The room did half the work.' },
  { name: 'Arvind S.', role: 'Product manager, Chennai', image: 'testimonial-2', quote: 'Small groups, clear agendas, hosts who answer everything. It is the only event site I check weekly.' },
]

export const GALLERY_TOP = ['gallery-1', 'gallery-2', 'gallery-3']
export const GALLERY_BOTTOM = ['gallery-4', 'gallery-5', 'gallery-6']

export const REVIEWS = [
  { name: 'Harini K.', city: 'Coimbatore', text: 'The chef was patient, the group was small, and I left with a menu I still cook every week.' },
  { name: 'Rahul M.', city: 'Bengaluru', text: 'Booked the summit in two minutes and the pass code worked at the door without any fuss.' },
  { name: 'Janani P.', city: 'Madurai', text: 'The sunrise photowalk changed how I look at my own city. Worth every early alarm.' },
  { name: 'Imran A.', city: 'Chennai', text: 'Honest agendas and real seat counts. I stopped second-guessing and just booked.' },
  { name: 'Sowmya T.', city: 'Online', text: 'The public speaking clinic gave me feedback I could use in my very next meeting.' },
  { name: 'Dinesh V.', city: 'Madurai', text: 'Great hosts, tidy venues and a registrations page that keeps everything in one place.' },
]
