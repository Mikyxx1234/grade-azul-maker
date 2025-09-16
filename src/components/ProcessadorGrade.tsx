import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Edit, Plus, Upload, FileText } from "lucide-react";
import { Disciplina } from "@/types";
import { parseGradeCurricular, validarGradeCurricular, formatarExemploGrade } from "@/utils/gradeParser";
import { useToast } from "@/hooks/use-toast";

interface ProcessadorGradeProps {
  disciplinas: Disciplina[];
  onDisciplinasChange: (disciplinas: Disciplina[]) => void;
}

export function ProcessadorGrade({ disciplinas, onDisciplinasChange }: ProcessadorGradeProps) {
  const [textoGrade, setTextoGrade] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const processarGrade = () => {
    if (!textoGrade.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira a grade curricular para processar.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const validacao = validarGradeCurricular(textoGrade);
      
      if (validacao.errors.length > 0) {
        setErrors(validacao.errors);
      } else {
        setErrors([]);
      }

      const disciplinasProcessadas = parseGradeCurricular(textoGrade);
      onDisciplinasChange(disciplinasProcessadas);
      
      if (disciplinasProcessadas.length > 0) {
        toast({
          title: "Sucesso!",
          description: `${disciplinasProcessadas.length} disciplinas processadas com sucesso.`
        });
        setTextoGrade("");
      }
    } catch (error) {
      toast({
        title: "Erro ao processar",
        description: "Ocorreu um erro ao processar a grade curricular.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removerDisciplina = (id: string) => {
    const novasDisciplinas = disciplinas.filter(d => d.id !== id);
    onDisciplinasChange(novasDisciplinas);
    toast({
      title: "Disciplina removida",
      description: "A disciplina foi removida da grade."
    });
  };

  const limparTudo = () => {
    onDisciplinasChange([]);
    setTextoGrade("");
    setErrors([]);
    toast({
      title: "Grade limpa",
      description: "Todas as disciplinas foram removidas."
    });
  };

  const carregarExemplo = () => {
    setTextoGrade(formatarExemploGrade());
  };

  const totalCargaHoraria = disciplinas.reduce((total, d) => total + d.cargaHoraria, 0);

  return (
    <div className="space-y-6">
      {/* Upload da Grade */}
      <Card className="shadow-cruzeiro border-primary/20">
        <CardHeader className="bg-gradient-cruzeiro-subtle">
          <CardTitle className="text-primary flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload da Grade Curricular
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gradeTexto" className="text-sm font-medium">
              Cole sua grade curricular (uma disciplina por linha)
            </Label>
            <Textarea
              id="gradeTexto"
              placeholder={`Exemplo:
ADMINISTRAÇÃO FINANCEIRA 80
CONTABILIDADE GERAL 80
LÍNGUA BRASILEIRA DE SINAIS 40

Formatos aceitos:
• DISCIPLINA 80
• DISCIPLINA, 80  
• DISCIPLINA;80`}
              value={textoGrade}
              onChange={(e) => setTextoGrade(e.target.value)}
              rows={8}
              className="font-mono text-sm border-primary/30 focus:border-primary"
            />
          </div>

          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={processarGrade} 
              disabled={isProcessing || !textoGrade.trim()}
              variant="cruzeiro"
              className="flex-1 min-w-fit"
            >
              <FileText className="w-4 h-4" />
              {isProcessing ? "Processando..." : "Processar Grade"}
            </Button>
            <Button 
              onClick={carregarExemplo} 
              variant="outline"
            >
              Carregar Exemplo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Disciplinas */}
      {disciplinas.length > 0 && (
        <Card className="shadow-cruzeiro border-primary/20">
          <CardHeader className="bg-gradient-cruzeiro-subtle">
            <CardTitle className="text-primary flex items-center justify-between">
              <span>Grade Processada</span>
              <div className="flex items-center gap-4 text-sm font-normal">
                <span className="bg-primary/10 px-3 py-1 rounded-full">
                  {disciplinas.length} disciplinas
                </span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">
                  {totalCargaHoraria}h total
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {disciplinas.map((disciplina, index) => (
                <div 
                  key={disciplina.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                    index % 2 === 0 ? 'bg-primary/5' : 'bg-background'
                  }`}
                >
                  <div className="flex-1">
                    <span className="font-medium text-sm">{disciplina.nome}</span>
                    <span className="ml-2 text-primary font-semibold">{disciplina.cargaHoraria}h</span>
                  </div>
                  <Button
                    onClick={() => removerDisciplina(disciplina.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <Button onClick={limparTudo} variant="outline" size="sm">
                <Trash2 className="w-4 h-4" />
                Limpar Tudo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}