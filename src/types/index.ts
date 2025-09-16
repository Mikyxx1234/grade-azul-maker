export interface Disciplina {
  id: string;
  nome: string;
  cargaHoraria: number;
}

export interface DadosCurso {
  nomeCurso: string;
  tipoFormacao: 'Bacharelado' | 'Licenciatura' | 'Tecnólogo';
  modalidade: 'EAD' | 'Presencial' | 'Semipresencial';
  duracao: '2 Anos' | '3 Anos' | '4 Anos' | '5 Anos';
}

export interface GradeCurricular {
  dadosCurso: DadosCurso;
  disciplinas: Disciplina[];
  totalDisciplinas: number;
  totalCargaHoraria: number;
}