import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradeCurricular } from "@/types";
import { Eye, BookOpen, Clock, GraduationCap } from "lucide-react";

interface PreviewGradeProps {
  gradeCurricular: GradeCurricular;
}

export function PreviewGrade({ gradeCurricular }: PreviewGradeProps) {
  const { dadosCurso, disciplinas, totalDisciplinas, totalCargaHoraria } = gradeCurricular;

  if (!dadosCurso.nomeCurso || disciplinas.length === 0) {
    return (
      <Card className="shadow-cruzeiro border-primary/20 opacity-50">
        <CardHeader className="bg-gradient-cruzeiro-subtle">
          <CardTitle className="text-primary flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview da Grade Curricular
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Preencha os dados do curso e adicione disciplinas para ver o preview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-cruzeiro-lg border-primary/30">
      <CardHeader className="bg-gradient-cruzeiro text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Eye className="w-6 h-6" />
          Preview da Grade Curricular
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Informações do Curso */}
        <div className="bg-gradient-cruzeiro-subtle p-4 rounded-lg">
          <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            {dadosCurso.nomeCurso}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <span className="text-sm text-muted-foreground">Tipo:</span>
              <Badge variant="secondary" className="ml-2">{dadosCurso.tipoFormacao}</Badge>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Duração:</span>
              <Badge variant="secondary" className="ml-2">{dadosCurso.duracao}</Badge>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Modalidade:</span>
              <Badge variant="secondary" className="ml-2 text-xs">{dadosCurso.modalidade}</Badge>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalDisciplinas}</div>
            <div className="text-sm text-muted-foreground">Disciplinas</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalCargaHoraria}h</div>
            <div className="text-sm text-muted-foreground">Carga Horária</div>
          </div>
        </div>

        {/* Lista de Disciplinas Resumida */}
        <div>
          <h4 className="font-semibold text-primary mb-3">Disciplinas ({disciplinas.length})</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {disciplinas.slice(0, 10).map((disciplina, index) => (
              <div 
                key={disciplina.id} 
                className={`flex justify-between items-center p-2 rounded text-sm ${
                  index % 2 === 0 ? 'bg-primary/5' : 'bg-background'
                }`}
              >
                <span className="font-medium truncate pr-2">{disciplina.nome}</span>
                <Badge variant="outline" className="text-xs">{disciplina.cargaHoraria}h</Badge>
              </div>
            ))}
            {disciplinas.length > 10 && (
              <div className="text-center text-sm text-muted-foreground py-2">
                ... e mais {disciplinas.length - 10} disciplinas
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}