export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  hospital: string;
  bio: string;
  availability: string[];
  reviews: Review[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    hospital: "Metro Cardiac Center, New York",
    bio: "Dr. Sarah Jenkins is a board-certified cardiologist specializing in preventive cardiology, cardiovascular diagnostics, and heart failure management. She completed her residency at Johns Hopkins and is passionate about promoting heart health through lifestyle modifications.",
    availability: ["Monday 9:00 AM - 1:00 PM", "Wednesday 2:00 PM - 6:00 PM", "Friday 10:00 AM - 4:00 PM"],
    reviews: [
      { user: "John Doe", rating: 5, comment: "Dr. Jenkins saved my life! Her preventive guidance is excellent.", date: "2026-05-12" },
      { user: "Emily Clark", rating: 4, comment: "Very thorough examination and extremely polite staff.", date: "2026-06-02" }
    ]
  },
  {
    id: "dr-marcus-vance",
    name: "Dr. Marcus Vance",
    specialty: "Neurologist",
    experience: "15 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    hospital: "Neurological Institute of Care",
    bio: "Dr. Marcus Vance is a renowned neurologist dedicated to diagnosing and treating complex brain disorders, migraines, sleep disorders, and neuropathic pain. He has published over 30 research articles in leading medical journals.",
    availability: ["Tuesday 10:00 AM - 3:00 PM", "Thursday 1:00 PM - 5:00 PM"],
    reviews: [
      { user: "Alice Smith", rating: 5, comment: "Incredibly smart and patient. Finally got an accurate diagnosis for my migraines.", date: "2026-05-24" }
    ]
  },
  {
    id: "dr-elena-rodriguez",
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatrician",
    experience: "8 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80",
    hospital: "St. Jude Children's Clinic",
    bio: "Dr. Elena Rodriguez provides compassionate pediatric care for infants, children, and adolescents. She believes in forming strong partnerships with parents to support the healthy growth and emotional well-being of every child.",
    availability: ["Monday 8:00 AM - 12:00 PM", "Tuesday 8:00 AM - 12:00 PM", "Wednesday 9:00 AM - 3:00 PM"],
    reviews: [
      { user: "Robert Johnson", rating: 5, comment: "Amazing pediatrician! My kids love her. She is extremely gentle.", date: "2026-06-10" }
    ]
  },
  {
    id: "dr-amit-sharma",
    name: "Dr. Amit Sharma",
    specialty: "Dermatologist",
    experience: "10 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    hospital: "Skin & Laser Center",
    bio: "Dr. Amit Sharma specializes in general dermatology, acne management, skin cancer screenings, and advanced cosmetic skin procedures. He focuses on restoring skin confidence through customized care regimens.",
    availability: ["Wednesday 10:00 AM - 4:00 PM", "Thursday 10:00 AM - 4:00 PM", "Saturday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Sophia Miller", rating: 4, comment: "Very professional. The treatment she recommended worked wonders in just 2 weeks.", date: "2026-04-18" }
    ]
  },
  {
    id: "dr-clara-dupont",
    name: "Dr. Clara Dupont",
    specialty: "Orthopedist",
    experience: "14 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1651008011912-b11846b99ea1?auto=format&fit=crop&w=300&q=80",
    hospital: "Joint & Spine Rehabilitation Center",
    bio: "Dr. Clara Dupont is an orthopedic surgeon specializing in joint replacement, sports medicine, and reconstructive surgery. She helps patients regain active lifestyles with advanced, minimally invasive treatments.",
    availability: ["Tuesday 9:00 AM - 2:00 PM", "Friday 1:00 PM - 5:00 PM"],
    reviews: [
      { user: "Michael Davis", rating: 5, comment: "Outstanding surgeon! My knee replacement recovery was faster than expected.", date: "2026-06-05" }
    ]
  },
  {
    id: "dr-rayan-reynolds",
    name: "Dr. Rayan Reynolds",
    specialty: "Physician",
    experience: "9 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    hospital: "General Care Hospital, New York",
    bio: "Dr. Rayan Reynolds is a general physician specializing in family medicine, chronic disease management, and regular health checkups. He values patient communication and comprehensive lifestyle counseling.",
    availability: ["Monday 8:00 AM - 1:00 PM", "Thursday 8:00 AM - 1:00 PM"],
    reviews: [
      { user: "Tom Hardy", rating: 5, comment: "Excellent family doctor. Very friendly and helpful.", date: "2026-06-12" }
    ]
  },
  {
    id: "dr-thomas-wayne",
    name: "Dr. Thomas Wayne",
    specialty: "Surgeon",
    experience: "20 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=300&q=80",
    hospital: "Gotham Surgery Center",
    bio: "Dr. Thomas Wayne is a senior general surgeon specializing in abdominal, thoracic, and acute trauma surgeries. With 20 years of experience, he leads advanced surgical procedures with precision and care.",
    availability: ["Wednesday 8:00 AM - 12:00 PM", "Friday 1:00 PM - 4:00 PM"],
    reviews: [
      { user: "Bruce Wayne", rating: 5, comment: "The absolute best surgeon. Professional, calm, and extremely skilled.", date: "2026-05-10" }
    ]
  },
  {
    id: "dr-maya-patel",
    name: "Dr. Maya Patel",
    specialty: "Gynecologist",
    experience: "11 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=300&q=80",
    hospital: "Women's Health & Wellness Clinic",
    bio: "Dr. Maya Patel is a gynecologist and obstetrician passionate about women's reproductive health, prenatal care, and minimally invasive surgeries. She strives to provide a comfortable and supportive environment.",
    availability: ["Tuesday 10:00 AM - 3:00 PM", "Thursday 10:00 AM - 3:00 PM"],
    reviews: [
      { user: "Jessica Alba", rating: 5, comment: "Wonderful doctor. Guided me throughout my pregnancy journey with amazing care.", date: "2026-06-08" }
    ]
  },
  {
    id: "dr-alan-grant",
    name: "Dr. Alan Grant",
    specialty: "Ophthalmologist",
    experience: "13 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&w=300&q=80",
    hospital: "Vision Care Eye Center",
    bio: "Dr. Alan Grant is an ophthalmologist specializing in cataract surgery, vision correction, and treatment of glaucoma and retinal diseases. He utilizes advanced diagnostic tools to restore and protect your sight.",
    availability: ["Monday 2:00 PM - 6:00 PM", "Wednesday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Lex Murphy", rating: 4, comment: "Very precise diagnosis and excellent support during my eye surgery recovery.", date: "2026-04-30" }
    ]
  }
];
