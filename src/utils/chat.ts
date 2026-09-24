export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  contact: {
    name: string;
    online: boolean;
  };
  property: {
    id: string;
    title: string;
    price: number;
  };
  lastMessageTime: string; // "14:08", "Ontem", "12/09"...
  unreadCount: number;
  messages: Message[];
}

export function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "?"
  );
}

// TODO: substituir por dados reais (Supabase) quando o chat for implementado
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    contact: { name: "Maria Souza", online: true },
    property: { id: "p1", title: "Kitnet - Centro", price: 800 },
    lastMessageTime: "14:08",
    unreadCount: 1,
    messages: [
      { id: "1", from: "me", text: "Oi! Ainda tem vaga disponível nessa kitnet?", time: "14:02" },
      { id: "2", from: "them", text: "Olá! Tem sim, a vaga é para estudante.", time: "14:05" },
      { id: "3", from: "me", text: "Perfeito. A internet e a água estão inclusas no valor?", time: "14:06" },
      { id: "4", from: "them", text: "Estão sim! Só a luz é separada. Quer agendar uma visita?", time: "14:08" },
    ],
  },
  {
    id: "2",
    contact: { name: "João Pereira", online: false },
    property: { id: "p2", title: "República - Vila Nova", price: 550 },
    lastMessageTime: "Ontem",
    unreadCount: 0,
    messages: [
      { id: "1", from: "me", text: "Boa tarde! A república aceita animais?", time: "16:20" },
      { id: "2", from: "them", text: "Boa tarde! Aceita sim, pets pequenos.", time: "16:45" },
      { id: "3", from: "me", text: "Obrigada, vou conversar com meus pais e te aviso.", time: "16:50" },
    ],
  },
  {
    id: "3",
    contact: { name: "Ana Lima", online: true },
    property: { id: "p3", title: "Apartamento - Jardim América", price: 1200 },
    lastMessageTime: "Ontem",
    unreadCount: 2,
    messages: [
      { id: "1", from: "me", text: "Olá, o apartamento é mobiliado?", time: "09:10" },
      { id: "2", from: "them", text: "É semi-mobiliado: cama, guarda-roupa e fogão.", time: "09:32" },
      { id: "3", from: "them", text: "Posso te mostrar amanhã se preferir.", time: "09:33" },
    ],
  },
  {
    id: "4",
    contact: { name: "Carlos Mendes", online: false },
    property: { id: "p4", title: "Quarto - Santa Helena", price: 450 },
    lastMessageTime: "12/09",
    unreadCount: 0,
    messages: [
      { id: "1", from: "me", text: "Oi, o valor inclui condomínio?", time: "11:00" },
      { id: "2", from: "them", text: "Inclui sim, e também o IPTU.", time: "11:20" },
    ],
  },
];