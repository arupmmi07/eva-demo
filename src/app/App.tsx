import { createHashRouter, Navigate, RouterProvider } from 'react-router';
import { EvaWorkflowApp } from '@/features/eva/EvaWorkflowApp';
import type { MomentId } from '@/moments/momentTypes';

function MomentPage({ momentId }: { momentId: MomentId }) {
  /** Remount workflow when switching moments (same component type at the same route depth). */
  return <EvaWorkflowApp key={momentId} momentId={momentId} />;
}

/** Single instance — avoids remounting the router in React StrictMode. */
const router = createHashRouter([
  // { path: '/', element: <Navigate to="moment1" replace /> },
  { path: 'moment1', element: <MomentPage momentId="moment1" /> },
  { path: 'moment2', element: <MomentPage momentId="moment2" /> },
  { path: 'moment3', element: <MomentPage momentId="moment3" /> },
  { path: 'moment4', element: <MomentPage momentId="moment4" /> },
  { path: 'moment5', element: <MomentPage momentId="moment5" /> },
  { path: 'moment6', element: <MomentPage momentId="moment6" /> },
  { path: 'moment7', element: <MomentPage momentId="moment7" /> },
  { path: 'moment8', element: <MomentPage momentId="moment8" /> },
  { path: 'moment9', element: <MomentPage momentId="moment9" /> },
  { path: 'moment10', element: <MomentPage momentId="moment10" /> },
  { path: 'moment11', element: <MomentPage momentId="moment11" /> },
  { path: 'moment12', element: <MomentPage momentId="moment12" /> },
  { path: 'moment13', element: <MomentPage momentId="moment13" /> },
  { path: '*', element: <Navigate to="moment1" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
