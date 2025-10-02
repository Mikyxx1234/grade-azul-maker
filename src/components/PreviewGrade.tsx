import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradeCurricular } from "@/types";
import { Eye, BookOpen, Clock, GraduationCap, FileText, Image } from "lucide-react";

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
    <div className="space-y-6">
      {/* Preview Resumido */}
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

      </CardContent>
      </Card>

      {/* Preview Completo do PDF */}
      <Card className="shadow-cruzeiro-lg border-primary/30">
        <CardHeader className="bg-gradient-cruzeiro text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6" />
            Preview Completo do PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="capa" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="capa" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Capa
              </TabsTrigger>
              <TabsTrigger value="grade" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Grade Curricular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="capa" className="mt-6">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8 rounded-lg min-h-[600px] flex flex-col justify-center items-center text-center">
                <div className="bg-white/10 p-4 rounded-lg mb-6">
                  <div className="w-32 h-20 bg-white/20 rounded flex items-center justify-center mb-4">
                    <span className="text-xs">LOGO</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-4 uppercase tracking-wide text-blue-900">
                  {dadosCurso.nomeCurso}
                </h1>
                <p className="text-xl mb-8 italic text-blue-900">Grade Curricular</p>
                
                <div className="space-y-2 mb-8 text-blue-900">
                  <p className="font-bold">Tipo de Formação: {dadosCurso.tipoFormacao}</p>
                  <p className="font-bold">Duração: {dadosCurso.duracao}</p>
                  <p className="font-bold">Modalidade: {dadosCurso.modalidade}</p>
                </div>
                
                <div className="bg-white/95 text-blue-900 p-6 rounded-lg max-w-md">
                  <h3 className="font-bold text-center mb-4 uppercase text-sm tracking-wide">
                    Resumo do Curso
                  </h3>
                  <div className="space-y-2 text-center">
                    <p className="font-bold">Total de Disciplinas: {totalDisciplinas}</p>
                    <p className="font-bold">Carga Horária Total: {totalCargaHoraria}h</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="grade" className="mt-6">
              <div className="bg-white border rounded-lg min-h-[600px]">
                {/* Cabeçalho da tabela */}
                <div className="bg-blue-600 text-white p-3 rounded-t-lg">
                  <div className="grid grid-cols-4 gap-4 font-bold text-sm">
                    <div className="col-span-3 text-left">DISCIPLINA</div>
                    <div className="col-span-1 text-center">CARGA HORÁRIA</div>
                  </div>
                </div>
                
                {/* Lista contínua de disciplinas */}
                <div className="max-h-[500px] overflow-y-auto">
                  {disciplinas.map((disciplina, index) => (
                    <div 
                      key={disciplina.id} 
                      className={`grid grid-cols-4 gap-4 p-3 text-sm border-b ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <div className="col-span-3 font-medium">
                        {disciplina.nome}
                      </div>
                      <div className="col-span-1 text-center font-bold text-blue-600">
                        {disciplina.cargaHoraria}h
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Rodapé */}
                <div className="p-4 border-t bg-gray-50 text-center text-xs text-gray-600">
                  A grade curricular está sujeita a alterações conforme necessário para garantir a qualidade do ensino de acordo com o MEC.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}