import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { EvaWorkflowApp } from '@/features/eva/EvaWorkflowApp';
import type { MomentId } from '@/moments/momentTypes';

function MomentPage({ momentId }: { momentId: MomentId }) {
  return <EvaWorkflowApp momentId={momentId} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/moment1" replace />} />
        <Route path="/moment1" element={<MomentPage momentId="moment1" />} />
        <Route path="/moment2" element={<MomentPage momentId="moment2" />} />
        <Route path="/moment3" element={<MomentPage momentId="moment3" />} />
        <Route path="*" element={<Navigate to="/moment1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
