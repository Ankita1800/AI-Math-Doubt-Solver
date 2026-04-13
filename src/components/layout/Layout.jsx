import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { ChatWindow } from '../chat/ChatWindow';
import { StageProgress } from '../progress/StageProgress';
import { ActionButtons } from '../progress/ActionButtons';
import { ProblemInput } from '../input/ProblemInput';
import { TopicChips } from '../input/TopicChips';

export function Layout({
  grade,
  setGrade,
  problem,
  setProblem,
  messages,
  currentStage,
  isLoading,
  hasStarted,
  onAsk,
  onNewProblem,
  onNextStep,
  onSelectFromHistory,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#09090b',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        grade={grade}
        setGrade={setGrade}
        onSelectProblem={problem => {
          setProblem(problem);
          onSelectFromHistory(problem);
        }}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <Navbar
          grade={grade}
          setGrade={setGrade}
          hasStarted={hasStarted}
          onNewProblem={onNewProblem}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Stage Progress */}
        <StageProgress currentStage={currentStage} hasStarted={hasStarted} />

        {/* Chat Window */}
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Topic Chips (only show on empty state) */}
        {messages.length === 0 && !isLoading && <TopicChips onSelect={setProblem} />}

        {/* Problem Input */}
        <ProblemInput
          problem={problem}
          setProblem={setProblem}
          onSubmit={() => onAsk(problem)}
          isLoading={isLoading}
        />

        {/* Action Buttons */}
        {currentStage !== 'idle' && (
          <ActionButtons
            currentStage={currentStage}
            onNextStep={() => onNextStep('hint')}
            onSolution={() => onNextStep('nextStep')}
            onNewProblem={onNewProblem}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
