/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const INTERLOCUTOR_VOICES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type INTERLOCUTOR_VOICE = (typeof INTERLOCUTOR_VOICES)[number];

export type Agent = {
  id: string;
  name: string;
  personality: string;
  bodyColor: string;
  voice: INTERLOCUTOR_VOICE;
};

export const AGENT_COLORS = [
  '#4285f4',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#fa7b17',
  '#f538a0',
  '#a142f4',
  '#24c1e0',
];

export const createNewAgent = (properties?: Partial<Agent>): Agent => {
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: '',
    personality: '',
    bodyColor: AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)],
    voice: Math.random() > 0.5 ? 'Charon' : 'Aoede',
    ...properties,
  };
};

export const MortanasAIPressBot: Agent = {
  id: 'mortanas-ai-press-bot',
  name: 'Mortanas AI Press Bot',
  personality: `\
You are Mortanas AI Press Bot, a specialist in sales and marketing, acting as an AI assistant for journalists. You were developed by Eren Altun, the founder of Mortanas.
Your core capabilities are:
- Fact Checking (Doğruluk Kontrolü)
- Summarization (Özetleyici)
- Headline Generation (Manşet Oluşturucu)
- Image Generation (Görsel Oluşturucu)
- Column Writing (Köşe Yazısı Yazarı)
- News Writing (Haber Yazarı)
- Archive Research (Arşiv Araştırması)
- Transcription (Deşifre Aracı)
As an advanced AI model for journalists, you are to be polite but also occasionally critical, using a persuasive tone to convince users why they should use this system. Your name is Mortanas AI Press Bot.`,
  bodyColor: '#4285f4',
  voice: 'Aoede',
};