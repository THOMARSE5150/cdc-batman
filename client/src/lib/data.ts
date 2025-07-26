
import { Users, Heart, Brain, Leaf, Flower, Sparkles } from "@/components/icons";

export const services = [
  {
    id: "anxiety",
    title: "Anxiety",
    shortDescription: "Supporting you to understand and manage anxiety symptoms for improved wellbeing.",
    description: "I provide support and evidence-based techniques to help you understand and manage anxiety, from general worry to specific phobias and panic attacks.",
    points: [
      "Learn to recognise anxiety triggers and patterns",
      "Develop effective coping strategies and relaxation techniques",
      "Challenge unhelpful thoughts and beliefs",
      "Build resilience and confidence in managing anxious feelings"
    ]
  },
  {
    id: "depression",
    title: "Depression",
    shortDescription: "Helping you navigate through depression and find meaning and joy in your life.",
    description: "I offer compassionate counselling to help you navigate through depression, develop coping mechanisms, and rediscover meaning and joy in your life.",
    points: [
      "Explore underlying factors contributing to depression",
      "Develop strategies to manage negative thought patterns",
      "Rebuild energy, motivation and engagement with life",
      "Create a personalized self-care plan for ongoing wellbeing"
    ]
  },
  {
    id: "trauma",
    title: "Trauma and Complex Relational Trauma",
    shortDescription: "Creating a safe space and therapeutic alliance to process and recover from past traumatic experiences.",
    description: "Creating a safe space and therapeutic alliance to process and recover from past traumatic experiences.",
    points: [
      "Process traumatic experiences at your own pace",
      "Learn techniques to manage trauma responses",
      "Reconnect with a sense of safety and control",
      "Develop post-traumatic growth and resilience"
    ]
  },
  {
    id: "emotion-regulation",
    title: "Emotional Dysregulation",
    shortDescription: "Deepening self awareness to manage difficult emotions.",
    description: "Deepening self awareness to manage difficult emotions.",
    points: [
      "Identify emotional patterns and triggers",
      "Learn emotional awareness and mindfulness techniques",
      "Develop healthy coping skills for intense emotions",
      "Build emotional resilience for long-term wellbeing"
    ]
  },
  {
    id: "interpersonal",
    title: "Interpersonal Difficulties",
    shortDescription: "Improving your relationships and communication with others.",
    description: "I help you explore relationship patterns, develop effective communication skills, and build healthier connections with others in your life.",
    points: [
      "Identify unhelpful relationship patterns",
      "Develop effective communication strategies",
      "Establish healthy boundaries",
      "Build more fulfilling connections with others"
    ]
  },
  {
    id: "self-esteem",
    title: "Low Self Esteem",
    shortDescription: "Connecting with and accepting your authentic self unconditionally.",
    description: "Connecting with and accepting your authentic self unconditionally.",
    points: [
      "Challenge negative self-talk and core beliefs",
      "Develop self-compassion and acceptance",
      "Recognise and build on personal strengths",
      "Create a more positive and realistic self-image"
    ]
  },
  {
    id: "eating",
    title: "Disordered Eating and Negative Body Image",
    shortDescription: "Supporting you to develop a healthier relationship with food and your body.",
    description: "I offer a non-judgmental space to address unhealthy relationships with food, negative body image concerns, and work toward a more balanced approach to nourishment and self-care.",
    points: [
      "Explore your relationship with food and body image",
      "Develop healthier coping strategies beyond food",
      "Address underlying emotional factors",
      "Work toward intuitive eating and body acceptance"
    ]
  },
  {
    id: "perfectionism",
    title: "Perfectionism",
    shortDescription: "Learning to harness perfectionism as a healthy trait.",
    description: "Learning to harness perfectionism as a healthy trait.",
    points: [
      "Recognise perfectionist patterns and their impact",
      "Challenge unrealistic standards and expectations",
      "Develop healthy striving vs. harmful perfectionism",
      "Build self-worth beyond achievement and performance"
    ]
  },
  {
    id: "grief",
    title: "Grief and Loss",
    shortDescription: "Supporting you through periods of grief and significant loss.",
    description: "I provide compassionate counselling to help you navigate the complex emotions of grief and find a path forward while honoring your loss.",
    points: [
      "Process complex emotions related to loss",
      "Develop coping strategies for different grief stages",
      "Find meaning and purpose after significant loss",
      "Adapt to life changes while honoring your experience"
    ]
  },
  {
    id: "life-transitions",
    title: "Life Transitions and Adjustment Issues",
    shortDescription: "Supporting you through major life changes and transitions, including adjustment to diagnosis.",
    description: "I help you navigate major life changes such as career shifts, relationship changes, health diagnoses, or other significant transitions, finding stability and meaning during uncertain times.",
    points: [
      "Develop strategies to manage uncertainty",
      "Process complex emotions around change",
      "Build resilience during challenging transitions",
      "Adjust to new circumstances while maintaining wellbeing"
    ]
  }
];

export const therapeuticApproaches = [
  {
    name: "Attachment Theory",
    description: "Foundation of my practice, focusing on how early relationships influence current patterns of relating to others."
  },
  {
    name: "Emotion Focused Therapy",
    description: "Accessing emotions to deepen awareness of your experience."
  },
  {
    name: "Compassion Focused Cognitive Behavioural Therapy",
    description: "Combines cognitive techniques with developing self-compassion to address difficult thoughts and feelings."
  },
  {
    name: "Dialectical Behavioural Therapy",
    description: "Teaches specific skills for emotion regulation, distress tolerance, and interpersonal effectiveness."
  },
  {
    name: "Acceptance and Commitment Therapy",
    description: "Helps you accept difficulties that cannot be changed, while committing to actions that address the ones you can."
  }
];

export const clientGroups = [
  {
    title: "Young People",
    description: "Specialised support for adolescents and young adults navigating identity, relationships, and life transitions.",
    icon: Users
  },
  {
    title: "Adults of All Ages",
    description: "Compassionate counselling addressing the unique concerns through various life stages.",
    icon: Heart
  },
  {
    title: "Those with Anxiety",
    description: "Evidence-based approaches to manage and reduce anxiety symptoms.",
    icon: Brain
  },
  {
    title: "Those with Depression",
    description: "Supportive care to address depression and improve mood and wellbeing.",
    icon: Leaf
  },
  {
    title: "Disordered Eating",
    description: "Specialised support for those struggling with eating patterns and body image concerns.",
    icon: Flower
  },
  {
    title: "Trauma Survivors",
    description: "Trauma-informed care ensuring a strong therapeutic alliance before reprocessing traumatic experiences.",
    icon: Sparkles
  }
];

export const sessionFees = [
  {
    id: "all-sessions",
    title: "ALL Sessions",
    duration: "50 minutes",
    price: 225.57,
    withRebate: 140.37
  }
];

export const paymentMethods = [
  {
    id: "eftpos",
    name: "EFTPOS"
  }
];

export const faqItems = [
  {
    question: "How long is the counselling appointment?",
    answer: "Each consultation is 50 minutes."
  },
  {
    question: "How much is the Medicare Rebate for each counselling session?",
    answer: "If eligible, the Medicare Rebate is $85.20 per session. Your GP can provide you a Mental Health Care Plan which will ensure you receive the Medicare Rebate."
  },
  {
    question: "Do I need to pay upfront for the counselling session and then obtain the Medicare rebate?",
    answer: "You will need to pay with a payment card at the end of the session and the rebate will be automatically processed for you with your medicare card."
  },
  {
    question: "How do I obtain the Medicare rebate?",
    answer: "The Medicare rebate will be automatically processed for you at the end of the session when you pay with your payment card and present your Medicare card."
  },
  {
    question: "What do you provide the referring GP?",
    answer: "GP update reports are provided for free as part of your support needs."
  },
  {
    question: "What if I'm experiencing financial difficulties?",
    answer: "Please contact me to discuss your situation and explore potential options. I'm committed to supporting all clients while maintaining a sustainable practice."
  },
  {
    question: "Do I need a referral to obtain the Medicare Rebate?",
    answer: "Yes, your GP must provide a referral letter and relevant management plan."
  },
  {
    question: "What does the Mental Health Care Plan provide?",
    answer: "- Initial 6 sessions of counselling with a mental health clinician.\n- A further 4 sessions can be provided if needed.\n- The total number of sessions you can claim under the plan is capped at 10 per calendar year."
  }
];