import { Disciplina } from "@/types";

export function parseGradeCurricular(texto: string): Disciplina[] {
  const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
  const disciplinas: Disciplina[] = [];
  
  linhas.forEach((linha, index) => {
    const linhaLimpa = linha.trim();
    
    // Padrões aceitos: "DISCIPLINA 80", "DISCIPLINA, 80", "DISCIPLINA;80"
    const patterns = [
      /^(.+)\s+(\d+)$/,           // DISCIPLINA 80
      /^(.+),\s*(\d+)$/,          // DISCIPLINA, 80
      /^(.+);\s*(\d+)$/,          // DISCIPLINA;80
      /^(.+)\t+(\d+)$/,           // DISCIPLINA	80 (tab)
    ];
    
    for (const pattern of patterns) {
      const match = linhaLimpa.match(pattern);
      if (match) {
        const nome = match[1].trim().toUpperCase();
        const cargaHoraria = parseInt(match[2]);
        
        if (nome && cargaHoraria > 0) {
          disciplinas.push({
            id: `disciplina-${index}-${Date.now()}`,
            nome,
            cargaHoraria
          });
          break;
        }
      }
    }
  });
  
  return disciplinas;
}

export function validarGradeCurricular(texto: string): { 
  isValid: boolean; 
  errors: string[];
  preview: Disciplina[];
} {
  const errors: string[] = [];
  const preview = parseGradeCurricular(texto);
  
  if (preview.length === 0) {
    errors.push('Nenhuma disciplina válida encontrada');
  }
  
  const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
  const linhasNaoProcessadas = linhas.length - preview.length;
  
  if (linhasNaoProcessadas > 0) {
    errors.push(`${linhasNaoProcessadas} linha(s) não puderam ser processadas`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    preview: preview.slice(0, 5) // Mostrar apenas as primeiras 5 para preview
  };
}

export function formatarExemploGrade(): string {
  return `ADMINISTRAÇÃO FINANCEIRA E ORÇAMENTÁRIA 80
CONTABILIDADE GERAL 80
LÍNGUA BRASILEIRA DE SINAIS 40
MARKETING DIGITAL 60
GESTÃO DE PESSOAS 80
ECONOMIA EMPRESARIAL 60
DIREITO EMPRESARIAL 40
ESTATÍSTICA APLICADA 60`;
}