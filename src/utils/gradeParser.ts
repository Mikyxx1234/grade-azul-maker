import { Disciplina } from "@/types";

export function parseGradeCurricular(texto: string): Disciplina[] {
  const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
  const disciplinas: Disciplina[] = [];
  
  linhas.forEach((linha, index) => {
    const linhaLimpa = linha.trim();
    
    // Ignorar linhas muito curtas ou que não parecem disciplinas
    if (linhaLimpa.length < 3) return;
    
    // Padrões aceitos: "DISCIPLINA 80", "DISCIPLINA, 80", "DISCIPLINA;80"
    const patterns = [
      /^(.+)\s+(\d+)$/,           // DISCIPLINA 80
      /^(.+),\s*(\d+)$/,          // DISCIPLINA, 80
      /^(.+);\s*(\d+)$/,          // DISCIPLINA;80
      /^(.+)\t+(\d+)$/,           // DISCIPLINA	80 (tab)
      /^(.+)\s*-\s*(\d+)$/,       // DISCIPLINA - 80
      /^(.+)\s*:\s*(\d+)$/,       // DISCIPLINA : 80
    ];
    
    for (const pattern of patterns) {
      const match = linhaLimpa.match(pattern);
      if (match) {
        let nome = match[1].trim();
        
        // Remover numeração no início (ex: "1. DISCIPLINA" ou "01 - DISCIPLINA")
        nome = nome.replace(/^\d+[\.\-\s]+/, '');
        
        // Converter para maiúsculas e limpar espaços extras
        nome = nome.toUpperCase().replace(/\s+/g, ' ').trim();
        
        const cargaHoraria = parseInt(match[2]);
        
        if (nome && nome.length > 2 && cargaHoraria >= 0 && cargaHoraria <= 1000) {
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
    errors.push('Nenhuma disciplina válida encontrada. Verifique o formato das linhas.');
  }
  
  const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
  const linhasNaoProcessadas = linhas.length - preview.length;
  
  if (linhasNaoProcessadas > 0) {
    errors.push(`${linhasNaoProcessadas} linha(s) não puderam ser processadas. Verifique se seguem o formato: NOME DA DISCIPLINA + CARGA HORÁRIA (pode ser 0)`);
  }
  
  // Verificar se há disciplinas com nomes muito curtos
  const disciplinasComNomesCurtos = preview.filter(d => d.nome.length < 5);
  if (disciplinasComNomesCurtos.length > 0) {
    errors.push(`${disciplinasComNomesCurtos.length} disciplina(s) com nomes muito curtos foram encontradas`);
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
ESTATÍSTICA APLICADA 60
METODOLOGIA CIENTÍFICA 40
COMUNICAÇÃO EMPRESARIAL 60
ÉTICA E RESPONSABILIDADE SOCIAL 40
EMPREENDEDORISMO 60`;
}