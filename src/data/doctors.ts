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
    id: "dr-robert-chen",
    name: "Dr. Robert Chen",
    specialty: "Cardiologist",
    experience: "14 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    hospital: "Downtown Heart & Vascular Center",
    bio: "Dr. Robert Chen specializes in interventional cardiology and advanced heart disease treatments. He is dedicated to providing cutting-edge, patient-centered cardiac care.",
    availability: ["Tuesday 9:00 AM - 1:00 PM", "Thursday 2:00 PM - 5:00 PM"],
    reviews: [
      { user: "David Miller", rating: 5, comment: "Extremely professional and knowledgeable.", date: "2026-06-15" }
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
    id: "dr-lisa-wong",
    name: "Dr. Lisa Wong",
    specialty: "Neurologist",
    experience: "10 years",
    rating: 4.9,
    image: "/dr-lisa.png",
    hospital: "Summit Neurology Group",
    bio: "Dr. Lisa Wong is a patient-first neurologist specializing in stroke recovery, cognitive health, and nerve rehabilitation.",
    availability: ["Monday 10:00 AM - 2:00 PM", "Wednesday 1:00 PM - 4:00 PM"],
    reviews: [
      { user: "Brian Lee", rating: 5, comment: "Very empathetic and explanation of treatment was clear.", date: "2026-06-20" }
    ]
  },
  {
    id: "dr-elena-rodriguez",
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatrician",
    experience: "8 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=300&q=80",
    hospital: "St. Jude Children's Clinic",
    bio: "Dr. Elena Rodriguez provides compassionate pediatric care for infants, children, and adolescents. She believes in forming strong partnerships with parents to support the healthy growth and emotional well-being of every child.",
    availability: ["Monday 8:00 AM - 12:00 PM", "Tuesday 8:00 AM - 12:00 PM", "Wednesday 9:00 AM - 3:00 PM"],
    reviews: [
      { user: "Robert Johnson", rating: 5, comment: "Amazing pediatrician! My kids love her. She is extremely gentle.", date: "2026-06-10" }
    ]
  },
  {
    id: "dr-james-carter",
    name: "Dr. James Carter",
    specialty: "Pediatrician",
    experience: "11 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    hospital: "Happy Hearts Pediatrics",
    bio: "Dr. James Carter specializes in pediatric growth monitoring, childhood allergies, and adolescent wellness.",
    availability: ["Thursday 9:00 AM - 1:00 PM", "Friday 9:00 AM - 3:00 PM"],
    reviews: [
      { user: "Tina Fey", rating: 4, comment: "Caring doctor who really listens to parental concerns.", date: "2026-05-18" }
    ]
  },
  {
    id: "dr-amit-sharma",
    name: "Dr. Amit Sharma",
    specialty: "Dermatologist",
    experience: "10 years",
    rating: 4.7,
    image: "/dr-amit-sharma.jpg",
    hospital: "Skin & Laser Center",
    bio: "Dr. Amit Sharma specializes in general dermatology, acne management, skin cancer screenings, and advanced cosmetic skin procedures. He focuses on restoring skin confidence through customized care regimens.",
    availability: ["Wednesday 10:00 AM - 4:00 PM", "Thursday 10:00 AM - 4:00 PM", "Saturday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Sophia Miller", rating: 4, comment: "Very professional. The treatment she recommended worked wonders in just 2 weeks.", date: "2026-04-18" }
    ]
  },
  {
    id: "dr-natalie-ports",
    name: "Dr. Natalie Ports",
    specialty: "Dermatologist",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80",
    hospital: "Lumina Dermatology Group",
    bio: "Dr. Natalie Ports specializes in medical dermatology, psoriasis treatment, and anti-aging therapies using gentle, effective approaches.",
    availability: ["Monday 9:00 AM - 4:00 PM", "Tuesday 1:00 PM - 5:00 PM"],
    reviews: [
      { user: "Oliver Queen", rating: 5, comment: "Excellent service and custom skin plan.", date: "2026-06-11" }
    ]
  },
  {
    id: "dr-clara-dupont",
    name: "Dr. Clara Dupont",
    specialty: "Orthopedist",
    experience: "14 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    hospital: "Joint & Spine Rehabilitation Center",
    bio: "Dr. Clara Dupont is an orthopedic surgeon specializing in joint replacement, sports medicine, and reconstructive surgery. She helps patients regain active lifestyles with advanced, minimally invasive treatments.",
    availability: ["Tuesday 9:00 AM - 2:00 PM", "Friday 1:00 PM - 5:00 PM"],
    reviews: [
      { user: "Michael Davis", rating: 5, comment: "Outstanding surgeon! My knee replacement recovery was faster than expected.", date: "2026-06-05" }
    ]
  },
  {
    id: "dr-samuel-jackson",
    name: "Dr. Samuel Jackson",
    specialty: "Orthopedist",
    experience: "16 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80",
    hospital: "Orthopedic & Trauma Clinic",
    bio: "Dr. Samuel Jackson is a senior consultant in orthopedics, focused on fracture management, spine care, and pediatric orthopedics.",
    availability: ["Wednesday 10:00 AM - 3:00 PM", "Thursday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Will Smith", rating: 5, comment: "Very precise and reassuring.", date: "2026-06-14" }
    ]
  },
  {
    id: "dr-rayan-reynolds",
    name: "Dr. Rayan Reynolds",
    specialty: "Physician",
    experience: "9 years",
    rating: 4.8,
    image: "/dr-rayan-reynolds.jpg",
    hospital: "General Care Hospital, New York",
    bio: "Dr. Rayan Reynolds is a general physician specializing in family medicine, chronic disease management, and regular health checkups. He values patient communication and comprehensive lifestyle counseling.",
    availability: ["Monday 8:00 AM - 1:00 PM", "Thursday 8:00 AM - 1:00 PM"],
    reviews: [
      { user: "Tom Hardy", rating: 5, comment: "Excellent family doctor. Very friendly and helpful.", date: "2026-06-12" }
    ]
  },
  {
    id: "dr-amanda-waller",
    name: "Dr. Amanda Waller",
    specialty: "Physician",
    experience: "13 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    hospital: "Apex Medical Clinic",
    bio: "Dr. Amanda Waller focuses on internal medicine, health prevention, diagnostics, and family health planning.",
    availability: ["Wednesday 8:00 AM - 12:00 PM", "Friday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Diana Prince", rating: 4, comment: "Efficient diagnosis and highly structured treatment plans.", date: "2026-06-03" }
    ]
  },
  {
    id: "dr-thomas-wayne",
    name: "Dr. Thomas Wayne",
    specialty: "Surgeon",
    experience: "20 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    hospital: "Gotham Surgery Center",
    bio: "Dr. Thomas Wayne is a senior general surgeon specializing in abdominal, thoracic, and acute trauma surgeries. With 20 years of experience, he leads advanced surgical procedures with precision and care.",
    availability: ["Wednesday 8:00 AM - 12:00 PM", "Friday 1:00 PM - 4:00 PM"],
    reviews: [
      { user: "Bruce Wayne", rating: 5, comment: "The absolute best surgeon. Professional, calm, and extremely skilled.", date: "2026-05-10" }
    ]
  },
  {
    id: "dr-arthur-dent",
    name: "Dr. Arthur Dent",
    specialty: "Surgeon",
    experience: "15 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    hospital: "Galaxy General Hospital",
    bio: "Dr. Arthur Dent is an expert in laparoscopic surgery, hernia repair, and gastrointestinal surgical procedures.",
    availability: ["Monday 1:00 PM - 5:00 PM", "Tuesday 8:00 AM - 12:00 PM"],
    reviews: [
      { user: "Ford Prefect", rating: 5, comment: "Very relaxed attitude, great surgeon.", date: "2026-05-22" }
    ]
  },
  {
    id: "dr-maya-patel",
    name: "Dr. Maya Patel",
    specialty: "Gynecologist",
    experience: "11 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    hospital: "Women's Health & Wellness Clinic",
    bio: "Dr. Maya Patel is a gynecologist and obstetrician passionate about women's reproductive health, prenatal care, and minimally invasive surgeries. She strives to provide a comfortable and supportive environment.",
    availability: ["Tuesday 10:00 AM - 3:00 PM", "Thursday 10:00 AM - 3:00 PM"],
    reviews: [
      { user: "Jessica Alba", rating: 5, comment: "Wonderful doctor. Guided me throughout my pregnancy journey with amazing care.", date: "2026-06-08" }
    ]
  },
  {
    id: "dr-elizabeth-olsen",
    name: "Dr. Elizabeth Olsen",
    specialty: "Gynecologist",
    experience: "12 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
    hospital: "Trinity Women's Clinic",
    bio: "Dr. Elizabeth Olsen specializes in hormonal therapy, prenatal consulting, and general gynecological health.",
    availability: ["Monday 9:00 AM - 1:00 PM", "Friday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Wanda Maximoff", rating: 5, comment: "Very attentive, supportive and professional.", date: "2026-06-19" }
    ]
  },
  {
    id: "dr-alan-grant",
    name: "Dr. Alan Grant",
    specialty: "Ophthalmologist",
    experience: "13 years",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    hospital: "Vision Care Eye Center",
    bio: "Dr. Alan Grant is an ophthalmologist specializing in cataract surgery, vision correction, and treatment of glaucoma and retinal diseases. He utilizes advanced diagnostic tools to restore and protect your sight.",
    availability: ["Monday 2:00 PM - 6:00 PM", "Wednesday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Lex Murphy", rating: 4, comment: "Very precise diagnosis and excellent support during my eye surgery recovery.", date: "2026-04-30" }
    ]
  },
  {
    id: "dr-jean-grey",
    name: "Dr. Jean Grey",
    specialty: "Ophthalmologist",
    experience: "11 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    hospital: "Clear Vision Clinic",
    bio: "Dr. Jean Grey specializes in laser eye surgery, corneal treatments, and pediatric vision diagnostics.",
    availability: ["Tuesday 2:00 PM - 6:00 PM", "Thursday 9:00 AM - 1:00 PM"],
    reviews: [
      { user: "Scott Summers", rating: 5, comment: "Helped restore my vision to 20/20. Outstanding clinic.", date: "2026-06-01" }
    ]
  }
];
