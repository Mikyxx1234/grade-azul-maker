import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';
import { GradeCurricular } from '@/types';

interface PDFDocumentProps {
  gradeCurricular: GradeCurricular;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
  },
  
  // Estilos da Capa
  coverPage: {
    padding: 0,
    flex: 1
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #93c5fd 0%, #1e40af 100%)',
  },
  
  coverContent: {
    textAlign: 'center',
    color: 'white',
    padding: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
    objectFit: 'contain',
  },
  
  courseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: 'normal',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  
  courseInfo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'normal',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  
  summary: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  
  // Estilos das páginas de grade
  gradePage: {
    padding: 40,
    backgroundColor: 'white',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: '2 solid #3b82f6',
  },
  
  headerLogo: {
    width: 60,
    height: 24,
    marginRight: 15,
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  
  table: {
    marginTop: 20,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    padding: 12,
    color: 'white',
  },
  
  tableHeaderCell1: {
    flex: 3,
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  tableHeaderCell2: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e5e7eb',
    padding: 10,
  },
  
  tableRowAlt: {
    flexDirection: 'row',
    borderBottom: '1 solid #e5e7eb',
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  
  tableCell1: {
    flex: 3,
    fontSize: 10,
    paddingRight: 10,
  },
  
  tableCell2: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e40af',
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
  
  // Dividir disciplinas em páginas (máximo 25 por página)
  const disciplinasPorPagina = 25;
  const paginas: any[][] = [];
  
  for (let i = 0; i < disciplinas.length; i += disciplinasPorPagina) {
    paginas.push(disciplinas.slice(i, i + disciplinasPorPagina));
  }
  
  return (
    <Document>
      {/* Página da Capa */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <View style={styles.coverContent}>
            
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
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Grade Curricular - {dadosCurso.nomeCurso}</Text>
            </View>
            
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell1}>DISCIPLINA</Text>
                <Text style={styles.tableHeaderCell2}>CARGA HORÁRIA</Text>
              </View>
              
              {paginaDisciplinas.map((disciplina, index) => (
                <View key={disciplina.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={styles.tableCell1}>{disciplina.nome}</Text>
                  <Text style={styles.tableCell2}>{disciplina.cargaHoraria}h</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text>
              A grade curricular está sujeita a alterações conforme necessário para garantir a qualidade do ensino de acordo com o MEC.
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}