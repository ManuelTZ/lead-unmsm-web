export type ProfileKey = 'tech' | 'impact' | 'comms' | 'ops';

export interface QuizOption {
  label: string;
  profile: ProfileKey;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const profileSummaries: Record<ProfileKey, { title: string; description: string }> = {
  tech: {
    title: 'Tech & Innovation — provisional',
    description: 'Te motiva construir, experimentar y resolver problemas con tecnología.',
  },
  impact: {
    title: 'Comunidad & Impacto — provisional',
    description: 'Te moviliza conectar iniciativas con personas y generar impacto medible.',
  },
  comms: {
    title: 'Comunicación — provisional',
    description: 'Destacas convirtiendo ideas complejas en mensajes claros y convocantes.',
  },
  ops: {
    title: 'Operaciones & Proyectos — provisional',
    description: 'Te gusta convertir ideas en planes, responsables, tiempos y entregables.',
  },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'En un proyecto nuevo, ¿qué actividad te atrae más?',
    options: [
      { label: 'Prototipar una solución', profile: 'tech' },
      { label: 'Diseñar el impacto en la comunidad', profile: 'impact' },
      { label: 'Crear la narrativa y convocatoria', profile: 'comms' },
      { label: 'Organizar tareas y responsables', profile: 'ops' },
    ],
  },
  {
    id: 'q2',
    prompt: '¿Qué problema disfrutas resolver?',
    options: [
      { label: 'Un reto técnico con varias alternativas', profile: 'tech' },
      { label: 'Cómo involucrar a más personas', profile: 'impact' },
      { label: 'Cómo hacer que un mensaje se entienda', profile: 'comms' },
      { label: 'Cómo entregar a tiempo con recursos limitados', profile: 'ops' },
    ],
  },
  {
    id: 'q3',
    prompt: 'En un evento, ¿dónde aportas naturalmente?',
    options: [
      { label: 'Herramientas, demos o soporte técnico', profile: 'tech' },
      { label: 'Experiencia de participantes y comunidad', profile: 'impact' },
      { label: 'Difusión, contenido y cobertura', profile: 'comms' },
      { label: 'Cronograma, logística y coordinación', profile: 'ops' },
    ],
  },
  {
    id: 'q4',
    prompt: '¿Qué resultado te da más satisfacción?',
    options: [
      { label: 'Que algo funcione mejor que antes', profile: 'tech' },
      { label: 'Que una iniciativa ayude a alguien', profile: 'impact' },
      { label: 'Que una idea llegue a mucha gente', profile: 'comms' },
      { label: 'Que un equipo entregue con orden', profile: 'ops' },
    ],
  },
];
