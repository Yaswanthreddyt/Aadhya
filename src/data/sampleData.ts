import { Task } from '../types/task';

export const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Take Morning Medication',
    description: 'Remember to take ADHD medication with breakfast',
    completed: false,
    createdAt: new Date('2024-03-18T08:00:00'),
    deadline: new Date('2024-03-18T09:00:00'),
    preferredCompletionTime: new Date('2024-03-18T08:30:00'),
    priority: 'high',
    category: 'health',
    energyLevel: 'medium'
  },
  {
    id: '2',
    title: 'Break Project into Small Tasks',
    description: 'Divide the main project into smaller, manageable chunks',
    completed: false,
    createdAt: new Date('2024-03-18T09:00:00'),
    deadline: new Date('2024-03-18T11:00:00'),
    preferredCompletionTime: new Date('2024-03-18T10:00:00'),
    priority: 'high',
    category: 'work',
    energyLevel: 'high'
  },
  {
    id: '3',
    title: '15-min Room Organization',
    description: 'Quick declutter session - one area at a time',
    completed: false,
    createdAt: new Date('2024-03-18T14:00:00'),
    deadline: new Date('2024-03-18T17:00:00'),
    preferredCompletionTime: new Date('2024-03-18T15:00:00'),
    priority: 'medium',
    category: 'home',
    energyLevel: 'medium'
  },
  {
    id: '4',
    title: 'Mindfulness Break',
    description: '5-minute meditation to regain focus',
    completed: true,
    createdAt: new Date('2024-03-18T11:00:00'),
    deadline: new Date('2024-03-18T12:00:00'),
    preferredCompletionTime: new Date('2024-03-18T11:30:00'),
    priority: 'medium',
    category: 'self-care',
    energyLevel: 'low'
  },
  {
    id: '5',
    title: 'Exercise: 20min HIIT',
    description: 'High-intensity workout to boost focus',
    completed: false,
    createdAt: new Date('2024-03-18T16:00:00'),
    deadline: new Date('2024-03-18T18:00:00'),
    preferredCompletionTime: new Date('2024-03-18T17:00:00'),
    priority: 'high',
    category: 'health',
    energyLevel: 'high'
  }
];

export const SAMPLE_ENERGY_LOG = [
  { time: '8:00', level: 6, note: 'Just woke up - medication not active yet' },
  { time: '9:30', level: 8, note: 'Medication kicked in - peak focus' },
  { time: '11:00', level: 7, note: 'Good focus - working on tasks' },
  { time: '13:00', level: 4, note: 'Post-lunch dip - need a break' },
  { time: '15:00', level: 7, note: 'Second wind after exercise' },
  { time: '17:00', level: 5, note: 'Medication wearing off' },
  { time: '19:00', level: 3, note: 'Evening fatigue - time to wind down' }
];

export const SAMPLE_INSIGHTS = {
  taskCompletion: {
    completed: 18,
    total: 25,
    byCategory: {
      work: { completed: 5, total: 8 },
      health: { completed: 4, total: 5 },
      'self-care': { completed: 6, total: 7 },
      home: { completed: 3, total: 5 }
    }
  },
  focusPatterns: {
    highEnergyHours: ['9:30', '10:30', '15:00', '16:00'],
    lowEnergyHours: ['8:00', '13:00', '19:00'],
    averageEnergyByDay: {
      Monday: 6.5,
      Tuesday: 7.2,
      Wednesday: 6.8,
      Thursday: 7.0,
      Friday: 6.2
    }
  },
  adhd: {
    medicationEffectiveness: {
      peakHours: ['9:30', '10:30', '11:30'],
      wearOffTime: '17:00',
      sideEffects: ['appetite decrease', 'mild anxiety']
    },
    distractions: {
      total: 24,
      majorTriggers: ['notifications', 'noise', 'hunger'],
      successfulInterventions: ['noise-canceling', 'pomodoro', 'snacks']
    },
    coping: {
      successfulStrategies: [
        'body-doubling',
        'time-blocking',
        'background music',
        'regular breaks'
      ],
      challengingTimes: ['early morning', 'post-lunch', 'late evening']
    }
  },
  focusSessions: {
    totalMinutes: 240,
    averageSessionLength: 25,
    mostProductiveTime: '10:00',
    completedTasks: 12,
    breaks: {
      taken: 8,
      missed: 3,
      averageDuration: 5
    }
  }
};

export const SAMPLE_FOCUS_SESSIONS = [
  {
    id: '1',
    duration: 25,
    task: 'Deep Work Session',
    completed: true,
    startTime: '09:30',
    distractions: 2,
    environment: 'quiet room',
    strategy: 'pomodoro'
  },
  {
    id: '2',
    duration: 25,
    task: 'Email Processing',
    completed: true,
    startTime: '11:00',
    distractions: 3,
    environment: 'office',
    strategy: 'time-blocking'
  },
  {
    id: '3',
    duration: 25,
    task: 'Project Planning',
    completed: false,
    startTime: '14:00',
    distractions: 4,
    environment: 'cafe',
    strategy: 'body-doubling'
  }
];

export const SAMPLE_QUICK_WINS = [
  'Take a 5-minute mindfulness break',
  'Clear desk of unnecessary items',
  'Write down any racing thoughts',
  'Do 10 jumping jacks',
  'Drink a glass of water',
  'Put on focus-enhancing music',
  'Set a timer for next task'
]; 