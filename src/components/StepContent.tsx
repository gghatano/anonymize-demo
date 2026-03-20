import type { ProcessingState, PanelType } from '../types';
import SourceDataTable from './SourceDataTable';
import ProcessingDesignCardList from './ProcessingDesignCardList';
import ProcessedDataTable from './ProcessedDataTable';
import AnalysisResultPanel from './AnalysisResultPanel';

interface StepContentProps {
  stepNum: number;
  type: PanelType;
  processingState: ProcessingState;
  onProcess: () => void;
}

export default function StepContent({ stepNum, type, processingState, onProcess }: StepContentProps) {
  switch (stepNum) {
    case 1:
      return <SourceDataTable type={type} />;
    case 2:
      return <ProcessingDesignCardList type={type} />;
    case 3:
      return (
        <ProcessedDataTable
          type={type}
          processingState={processingState}
          onProcess={onProcess}
        />
      );
    case 4:
      return <AnalysisResultPanel type={type} />;
    default:
      return null;
  }
}
