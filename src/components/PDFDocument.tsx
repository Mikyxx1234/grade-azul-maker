import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';
import { GradeCurricular } from '@/types';

interface PDFDocumentProps {
  gradeCurricular: GradeCurricular;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    margin: 0,
    fontFamily: 'Helvetica',
  },
  
  // Estilos da Capa
  coverPage: {
    padding: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#86BFE2',
  },
  coverContent: {
    textAlign: 'center',
    color: 'white',
    padding: 50,
    width: '100%',
    display: 'flex',
  },
  
  logo: {
    width: 280,
    height: 172,
    marginBottom: 50,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  
  courseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#001f4a',
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 18,
    marginBottom: 35,
    fontWeight: 'normal',
    color: '#001f4a',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  courseInfo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#001f4a',
    textAlign: 'center',
  },
  
  summary: {
    marginTop: 40,
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    border: '2px solid rgba(0, 31, 74, 0.2)',
    boxShadow: '0 8px 25px rgba(0, 31, 74, 0.15)',
    maxWidth: 400,
    alignSelf: 'center',
  },
  
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#001f4a',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  summaryText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#001f4a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  // Estilos das páginas de grade
  gradePage: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    backgroundColor: 'white',
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    margin: 0,
    borderBottom: '2 solid #3b82f6',
  },
  
  headerLogo: {
    width: 60,
    height: 24,
    marginRight: 15,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  
  table: {
    margin: 0,
    padding: 0,
    flex: 1,
  },
  
  tableHeader: {
    flexDirection: 'row', // Keep as row for header
    backgroundColor: '#3b82f6',
    paddingVertical: 6, // Increased for better readability
    paddingHorizontal: 8, // Increased for better readability
    color: 'white',
    margin: 0,
    break: 'avoid', // Avoid breaking the header
  },
  
  tableHeaderCell1: {
    flex: 0.7, // Adjusted flex for numbering
    fontSize: 10, // Increased for better readability
    fontWeight: 'bold',
    width: '10%', // Give some width for the number
  },
  
  tableHeaderCell2: {
    flex: 3, // Adjusted flex for discipline name
    fontSize: 10, // Increased for better readability
    fontWeight: 'bold',
    textAlign: 'left', // Align left for discipline name
    width: '70%', // Give more width for the name
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e5e7eb',
    paddingVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 4, // Adjusted for better line spacing
    margin: 0,
    break: 'avoid', // Keep rows from breaking across pages
  },
  
  tableRowAlt: {
    flexDirection: 'row',
    borderBottom: '1 solid #e5e7eb',
    paddingVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 4, // Adjusted for better line spacing
    backgroundColor: '#f8fafc',
    margin: 0,
    break: 'avoid', // Keep rows from breaking across pages
  },
  
  tableCell1: {
    flex: 0.7, // Adjusted flex for numbering
    fontSize: 9, // Increased for better readability
    paddingRight: 4, // Adjusted padding
    margin: 0,
    lineHeight: 1.4, // Adjusted for better readability
    width: '10%', // Consistent width
    textAlign: 'right', // Align number to the right
  },
  tableCell1Content: { // New style for discipline name
    flex: 3, // Adjusted flex for discipline name
    fontSize: 9, // Increased for better readability
    paddingLeft: 4, // Add padding to separate number from name
    paddingRight: 8,
    margin: 0,
    lineHeight: 1.4, // Adjusted for better readability
  },
  
  tableCell2: {
    flex: 1,
    fontSize: 9, // Increased for better readability
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: 0,
    lineHeight: 1.4, // Adjusted for better readability
  },
  
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
    paddingTop: 15,
    borderTop: '1 solid #e5e7eb',
  },
});

export function PDFDocument({ gradeCurricular }: PDFDocumentProps) {
  const { dadosCurso, disciplinas, totalDisciplinas, totalCargaHoraria } = gradeCurricular;
  
  // Pagination logic
  const disciplinasPorPagina = 36;
  const paginas = [];
  for (let i = 0; i < disciplinas.length; i += disciplinasPorPagina) {
    paginas.push(disciplinas.slice(i, i + disciplinasPorPagina));
  }
  
  return (
    <Document>
      {/* Página da Capa */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <View style={styles.coverContent}>
            <Image 
              style={styles.logo} 
              src="/logo teste.png"
            />
            
            <Text style={styles.courseTitle}>{dadosCurso.nomeCurso}</Text>
            <Text style={styles.subtitle}>Grade Curricular</Text>
            
            <Text style={styles.courseInfo}>Tipo de Formação: {dadosCurso.tipoFormacao}</Text>
            <Text style={styles.courseInfo}>Duração: {dadosCurso.duracao}</Text>
            <Text style={styles.courseInfo}>Modalidade: {dadosCurso.modalidade}</Text>
            
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Resumo do Curso</Text>
              <Text style={styles.summaryText}>Total de Disciplinas: {totalDisciplinas}</Text>
              <Text style={styles.summaryText}>Carga Horária Total: {totalCargaHoraria}h</Text>
            </View>
          </View>
        </View>
      </Page>
      
      {/* Páginas da Grade Curricular */}
      {paginas.map((paginaDisciplinas, indexPagina) => (
        <Page key={indexPagina} size="A4" style={styles.page}>
          <View style={styles.gradePage}>
            {/* HEADER DA TABELA APENAS NA PRIMEIRA PÁGINA DA LISTA */}
            {indexPagina === 0 && (
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell1}>#</Text>
                <Text style={styles.tableHeaderCell2}>DISCIPLINA</Text>
                <Text style={styles.tableHeaderCell2}>CARGA HORÁRIA</Text>
              </View>
            )}
            
            <View style={styles.table}>
              {/* LISTA CONTÍNUA SEM QUEBRAS */}
              {paginaDisciplinas.map((disciplina, index) => (
                <View key={disciplina.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={styles.tableCell1}>
                    {(indexPagina * disciplinasPorPagina) + index + 1}.
                  </Text>
                  <Text style={styles.tableCell1Content}>{disciplina.nome}</Text>
                  <Text style={styles.tableCell2}>{disciplina.cargaHoraria}h</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* RODAPÉ APENAS NA ÚLTIMA PÁGINA */}
          {indexPagina === paginas.length - 1 && (
            <View style={styles.footer}>
              <Text>
                A grade curricular está sujeita a alterações conforme necessário para garantir a qualidade do ensino de acordo com o MEC.
              </Text>
            </View>
          )}
        </Page>
      ))}
    </Document>
  );
}</Text>
          <View style={styles.table}>
  {disciplinas.map((disciplina, index) => (
    <View key={disciplina.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
      <Text style={styles.tableCell1}>{index + 1}.</Text>
      <Text style={styles.tableCell1Content}>{disciplina.nome}</Text>
      <Text style={styles.tableCell2}>{disciplina.cargaHoraria}h</Text>
    </View>