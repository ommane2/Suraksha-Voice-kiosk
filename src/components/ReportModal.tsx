import React from 'react';
import { X, Printer, Download, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { SafetyReport } from '../types';

interface ReportModalProps {
  report: SafetyReport;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const textContent = `
=====================================================
${report.reportTitle}
Generated Date: ${report.generatedDate}
Plant Location: MIDC Industrial Unit 4, Chakan, Pune
Priority Risk Level: ${report.priorityRiskLevel}
=====================================================

EXECUTIVE SUMMARY:
${report.executiveSummary}

KEY AUDIT FINDINGS:
${report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

RECOMMENDED CORRECTIVE ACTIONS FOR SUPERVISORS:
${report.recommendedActions.map((a, i) => `[Action ${i + 1}]: ${a}`).join('\n')}

COMPLIANCE STATUS:
${report.complianceStatus}

=====================================================
Certified by: Factory Safety Officer & Audit Committee
Suraksha Voice Kiosk System
=====================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Suraksha_Safety_Report_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 my-8 max-h-[92vh] overflow-y-auto">
        {/* Actions bar at top */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm uppercase tracking-wider">
            <FileText className="w-5 h-5" />
            <span>AI Automated Safety Intelligence Report</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
              title="Download Text File"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 text-slate-200 font-sans">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Shop-Floor Safety Directorate
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {report.reportTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Plant: MIDC Unit 4, Chakan • Generated: {report.generatedDate}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">Risk Assessment:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  report.priorityRiskLevel === 'HIGH'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : report.priorityRiskLevel === 'MEDIUM'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {report.priorityRiskLevel} PRIORITY
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>1. Executive Summary</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              {report.executiveSummary}
            </p>
          </div>

          {/* Key Findings */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>2. Shop-Floor Hazard & Comprehension Findings</span>
            </h4>
            <div className="space-y-2">
              {report.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs sm:text-sm text-slate-300"
                >
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Corrective Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. Corrective Action Plan for Shift Supervisors</span>
            </h4>
            <div className="space-y-2">
              {report.recommendedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100"
                >
                  <span className="w-5 h-5 rounded-md bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Statement */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Regulatory Compliance Status:
            </span>
            <p className="text-xs text-slate-300 italic">
              {report.complianceStatus}
            </p>
          </div>

          {/* Signoff block */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Audit Ref: SURAKSHA-KIOSK-04-2026</span>
            <span>Recorded via Multilingual Voice Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
