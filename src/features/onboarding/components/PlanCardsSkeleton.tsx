import React from "react";

function PlanCardSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-shimmer skeleton-radio" />

            <div className="skeleton-text-block">
                <div className="skeleton-shimmer skeleton-line skeleton-title" />
            </div>

            <div className="skeleton-shimmer skeleton-image" />
        </div>
    );
}

export const PlanCardsSkeleton = () => {
    return (
        <>
            <style>{`
        .skeleton-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-card {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 112px;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          background-color: #ffffff;
          padding: 12px;
          box-sizing: border-box;
        }

        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background-color: #e2e8f0;
        }

        .skeleton-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            to left,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.6s infinite;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .skeleton-image {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 12px;
        }

        .skeleton-text-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skeleton-line {
          border-radius: 4px;
        }

        .skeleton-title {
          width: 96px;
          height: 16px;
        }

        .skeleton-desc-1 {
          width: 100%;
          max-width: 220px;
          height: 12px;
        }

        .skeleton-desc-2 {
          width: 75%;
          max-width: 160px;
          height: 12px;
        }

        .skeleton-radio {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
        }
      `}</style>

            <div className="skeleton-wrapper">
                <PlanCardSkeleton />
                <PlanCardSkeleton />
                <PlanCardSkeleton />
            </div>
        </>
    );
};

export default PlanCardsSkeleton;