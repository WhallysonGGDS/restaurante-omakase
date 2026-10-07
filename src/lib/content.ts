export const SITE = {
  name: "AKANE",
  kanji: "茜",
  city: "Goiânia",
  // Placeholder — troque pelo número real de reservas
  whatsapp:
    "https://wa.me/5562900000000?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20omakase%20do%20Akane.",
};

export const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Experiência", href: "#filosofia" },
  { label: "Menu", href: "#menu" },
  { label: "Omakase", href: "#omakase" },
  { label: "Contato", href: "#contato" },
];

export const COURSES = [
  {
    n: "01",
    jp: "寿司",
    name: "Sushi",
    text: "Arroz temperado à temperatura do corpo, peixe maturado por dias. Cada peça é servida no instante exato em que deve ser comida.",
    img: "/images/nigiri.webp",
    alt: "Fileira de nigiris de salmão, atum e peixe branco sobre pedra escura",
  },
  {
    n: "02",
    jp: "刺身",
    name: "Sashimi",
    text: "Cortes limpos, feitos em um único movimento de lâmina. O peixe fala sozinho — nós apenas abrimos espaço.",
    img: "/images/sashimi.webp",
    alt: "Sashimi de atum, salmão e peixe branco com folha de shiso",
  },
  {
    n: "03",
    jp: "炙り",
    name: "Aburi & quentes",
    text: "O fogo entra em cena: maçarico sobre binchotan, caldos de dashi e o calor que muda a textura de tudo.",
    img: "/images/omakase-prato.webp",
    alt: "Prato omakase visto de cima com peças maçaricadas, ikura e camarão",
  },
  {
    n: "04",
    jp: "酒",
    name: "Saquê",
    text: "Junmai daiginjo de pequenas casas, escolhidos para acompanhar o ritmo do menu — nunca para competir com ele.",
    img: "/images/sake.webp",
    alt: "Garrafa de saquê escura com tampa dourada e dois copos de cerâmica",
  },
  {
    n: "05",
    jp: "甘味",
    name: "Sobremesa",
    text: "O encerramento é silencioso: wagashi da estação, matcha batido à mão e um último gole de chá.",
    // Placeholder até existir uma foto de sobremesa
    img: "/images/ceramica.webp",
    alt: "Cerâmicas artesanais japonesas sobre mesa de madeira escura",
  },
];

export const CRAFT = [
  {
    n: "一",
    title: "O corte",
    text: "Um único movimento. A lâmina de yanagiba atravessa o peixe sem serrar, preservando fibra, brilho e temperatura.",
    img: "/images/chef-corte.webp",
    alt: "Chef cortando um bloco de atum com faca yanagiba",
  },
  {
    n: "二",
    title: "A preparação",
    text: "Diante de você, a poucos centímetros. Nada é montado longe dos seus olhos — o balcão é o palco.",
    img: "/images/chef-balcao.webp",
    alt: "Chef finalizando uma peça no balcão diante dos convidados",
  },
  {
    n: "三",
    title: "A finalização",
    text: "Um toque de wasabi ralado na hora, uma folha, uma gota de nikiri. A peça chega pronta. Não precisa de shoyu.",
    img: "/images/otoro.webp",
    alt: "Nigiri de otoro com wasabi fresco e microfolhas",
  },
];

export const MENU = [
  {
    n: "01",
    name: "Omakase Akane",
    meta: "18 tempos · cerca de 2h30",
    text: "A sequência completa da estação: sakizuke, sashimi, nigiri, aburi e sobremesa.",
    price: "R$ 890",
    img: "/images/omakase-prato.webp",
    alt: "Prato omakase com sashimi, nigiri maçaricado e ikura",
  },
  {
    n: "02",
    name: "Omakase Kiwami",
    meta: "24 tempos · cerca de 3h",
    text: "Para quem quer ir além: otoro, uni de Hokkaido e cortes que chegam apenas uma vez por semana.",
    price: "R$ 1.290",
    img: "/images/otoro.webp",
    alt: "Nigiri de otoro em close",
  },
  {
    n: "03",
    name: "Harmonização de saquê",
    meta: "6 taças · seleção do sommelier",
    text: "Saquês de pequenas casas japonesas, servidos em diálogo com cada tempo do menu.",
    price: "R$ 420",
    img: "/images/sake.webp",
    alt: "Garrafa de saquê e copos de cerâmica",
  },
  {
    n: "04",
    name: "Balcão privativo",
    meta: "até 10 convidados",
    text: "O balcão inteiro, uma noite, um menu desenhado para a ocasião.",
    price: "Sob consulta",
    img: "/images/entrada.webp",
    alt: "Entrada do restaurante com painel shoji iluminado",
  },
];

export const TEMPOS = [
  { id: "inicio", k: "一", label: "Abertura" },
  { id: "filosofia", k: "二", label: "Filosofia" },
  { id: "omakase", k: "三", label: "Omakase" },
  { id: "chef", k: "四", label: "O Chef" },
  { id: "arte", k: "五", label: "A Arte" },
  { id: "espaco", k: "六", label: "O Espaço" },
  { id: "menu", k: "七", label: "O Menu" },
  { id: "reserva", k: "八", label: "Reserva" },
];
