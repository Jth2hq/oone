import React from "react";
import "./oone-global.css";

export type TutorialStep = { title: string; bodyHtml: string };

export type TutorialOverlayProps = {
  open?: boolean;
  stepIndex: number;
  totalSteps: number;
  step?: TutorialStep;
  dots?: boolean;
  onNext?: () => void;
  onSkip?: () => void;
  onClose?: () => void;
  isLast?: boolean;
  children?: React.ReactNode;
};

/** Onboarding overlay (`#tut`). */
export default function TutorialOverlay({
  open,
  stepIndex,
  totalSteps,
  step,
  onNext,
  onSkip,
  onClose,
  isLast,
  children,
}: TutorialOverlayProps) {
  return (
    <div id="tut" className={open ? "on" : ""}>
      <div className="tut-dim" onClick={onClose} role="presentation" />
      <div className="tut-card">
        {children ?? (
          <>
            <div className="tut-step">
              {stepIndex + 1} / {totalSteps}
            </div>
            {step ? (
              <>
                <div className="tut-title">{step.title}</div>
                <div
                  className="tut-body"
                  dangerouslySetInnerHTML={{ __html: step.bodyHtml }}
                />
              </>
            ) : null}
            <div className="tut-nav">
              <div className="tut-dots">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`tut-dot${i === stepIndex ? " on" : ""}`}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {!isLast ? (
                  <button type="button" className="tut-skip" onClick={onSkip}>
                    skip
                  </button>
                ) : null}
                <button type="button" className="tut-btn" onClick={onNext}>
                  {isLast ? "let's go" : "next"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
