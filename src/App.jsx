import { useChat } from './hooks/useChat';
import { useHistory } from './hooks/useHistory';
import { Layout } from './components/layout/Layout';

export default function App() {
  const {
    grade,
    setGrade,
    problem,
    setProblem,
    messages,
    currentStage,
    isLoading,
    hasStarted,
    handleAsk,
    handleNext,
    handleReset,
  } = useChat();

  const { addToHistory } = useHistory();

  const handleSelectFromHistory = (selectedProblem) => {
    setProblem(selectedProblem);
  };

  const handleAskWrapper = (problemText) => {
    addToHistory(problemText, grade);
    handleAsk(problemText);
  };

  const handleNextWrapper = (stage) => {
    if (stage === 'hint') {
      handleNext('nextStep');
    } else if (stage === 'nextStep') {
      handleNext('solution');
    }
  };

  return (
    <Layout
      grade={grade}
      setGrade={setGrade}
      problem={problem}
      setProblem={setProblem}
      messages={messages}
      currentStage={currentStage}
      isLoading={isLoading}
      hasStarted={hasStarted}
      onAsk={handleAskWrapper}
      onNewProblem={handleReset}
      onNextStep={handleNextWrapper}
      onSelectFromHistory={handleSelectFromHistory}
    />
  );
}

