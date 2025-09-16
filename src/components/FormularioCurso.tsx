import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DadosCurso } from "@/types";

interface FormularioCursoProps {
  dadosCurso: DadosCurso;
  onDadosChange: (dados: DadosCurso) => void;
}

export function FormularioCurso({ dadosCurso, onDadosChange }: FormularioCursoProps) {
  const updateDados = (field: keyof DadosCurso, value: string) => {
    onDadosChange({
      ...dadosCurso,
      [field]: value
    });
  };

  return (
    <Card className="shadow-cruzeiro border-primary/20">
      <CardHeader className="bg-gradient-cruzeiro-subtle">
        <CardTitle className="text-primary">Dados do Curso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="nomeCurso" className="text-sm font-medium">Nome do Curso *</Label>
          <Input
            id="nomeCurso"
            placeholder="Ex: Administração"
            value={dadosCurso.nomeCurso}
            onChange={(e) => updateDados('nomeCurso', e.target.value)}
            className="border-primary/30 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipoFormacao" className="text-sm font-medium">Tipo de Formação *</Label>
            <Select value={dadosCurso.tipoFormacao} onValueChange={(value) => updateDados('tipoFormacao', value as DadosCurso['tipoFormacao'])}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bacharelado">Bacharelado</SelectItem>
                <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                <SelectItem value="Tecnólogo">Tecnólogo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duracao" className="text-sm font-medium">Duração *</Label>
            <Select value={dadosCurso.duracao} onValueChange={(value) => updateDados('duracao', value as DadosCurso['duracao'])}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 Anos">2 Anos</SelectItem>
                <SelectItem value="3 Anos">3 Anos</SelectItem>
                <SelectItem value="4 Anos">4 Anos</SelectItem>
                <SelectItem value="5 Anos">5 Anos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalidade" className="text-sm font-medium">Modalidade *</Label>
            <Select value={dadosCurso.modalidade} onValueChange={(value) => updateDados('modalidade', value as DadosCurso['modalidade'])}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EAD">EAD</SelectItem>
                <SelectItem value="Presencial">Presencial</SelectItem>
                <SelectItem value="Semipresencial">Semipresencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}