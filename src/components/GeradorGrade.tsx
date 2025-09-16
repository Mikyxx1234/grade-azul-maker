import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FormularioCurso } from "./FormularioCurso";
import { ProcessadorGrade } from "./ProcessadorGrade";
import { PreviewGrade } from "./PreviewGrade";
import { PDFDocument } from "./PDFDocument";
import { DadosCurso, Disciplina, GradeCurricular } from "@/types";
import { Download, FileText } from "lucide-react";

export function GeradorGrade() {
  const [dadosCurso, setDadosCurso] = useState<DadosCurso>({
    nomeCurso: "",
    tipoFormacao: "Bacharelado",
    modalidade: "EAD 100% Digital/Aulas ao Vivo",
    duracao: "4 Anos"
  });

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const { toast } = useToast();

  const gradeCurricular: GradeCurricular = {
    dadosCurso,
    disciplinas,
    totalDisciplinas: disciplinas.length,
    totalCargaHoraria: disciplinas.reduce((total, d) => total + d.cargaHoraria, 0)
  };

  const isValid = dadosCurso.nomeCurso.trim() !== "" && disciplinas.length > 0;

  const handlePDFGenerated = () => {
    toast({
      title: "PDF Gerado!",
      description: "Sua grade curricular foi gerada com sucesso.",
    });
  };

  const nomeArquivo = `grade-curricular-${dadosCurso.nomeCurso.toLowerCase().replace(/\s+/g, '-')}.pdf`;

  return (
    <div className="min-h-screen bg-gradient-cruzeiro-subtle">
      {/* Header */}
      <header className="bg-gradient-cruzeiro text-white shadow-cruzeiro-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Gerador de Grade Curricular
            </h1>
            <p className="text-lg opacity-90">Cruzeiro do Sul Virtual</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Formulário do Curso */}
        <FormularioCurso 
          dadosCurso={dadosCurso} 
          onDadosChange={setDadosCurso} 
        />

        {/* Processador de Grade */}
        <ProcessadorGrade 
          disciplinas={disciplinas} 
          onDisciplinasChange={setDisciplinas} 
        />

        {/* Preview */}
        <PreviewGrade gradeCurricular={gradeCurricular} />

        {/* Botão Gerar PDF */}
        <div className="flex justify-center">
          {isValid ? (
            <PDFDownloadLink
              document={<PDFDocument gradeCurricular={gradeCurricular} />}
              fileName={nomeArquivo}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-cruzeiro text-white rounded-lg font-semibold shadow-cruzeiro-lg hover:bg-gradient-cruzeiro-dark transition-smooth text-lg"
              onClick={handlePDFGenerated}
            >
              {({ loading }) => (
                <>
                  {loading ? (
                    <>
                      <FileText className="w-6 h-6 animate-spin" />
                      Gerando PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Gerar PDF da Grade Curricular
                    </>
                  )}
                </>
              )}
            </PDFDownloadLink>
          ) : (
            <Button 
              disabled 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg"
            >
              <FileText className="w-6 h-6" />
              Preencha os dados para gerar PDF
            </Button>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8">
          <p>© 2024 Cruzeiro do Sul Virtual - Gerador de Grade Curricular</p>
          <p className="mt-2">
            Ferramenta desenvolvida para facilitar a criação de grades curriculares padronizadas
          </p>
        </footer>
      </main>
    </div>
  );
}