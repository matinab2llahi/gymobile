"use client";

import { Search, X } from "lucide-react";
import { useSkillsModalViewModel } from "../view-models/useSkillsModalViewModel";
import { SkillChip } from "./SkillChip";
import { SkillPill } from "./SkillPill";

export function SkillsModal() {
  const {
    isLoadingSkills,
    searchQuery,
    selectedSkills,
    availableSkills,
    onSearchChange,
    onToggleSkill,
    onRemoveSkill,
    onClose,
  } = useSkillsModalViewModel();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-2xl sm:items-center" >
      <div onClick={onClose} className={"absolute inset-0 z-10 "}></div>
      <div className="absolute z-50 top-1/2 left-1/2 -translate-1/2 flex max-h-[85vh] w-full sm:max-w-lg flex-col rounded-t-3xl bg-background sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2 className="text-lg font-bold text-text-primary">افزودن مهارت‌ها</h2>
            <p className="mt-1 text-sm text-text-secondary">
              مهارت‌هایی که شما را توصیف می‌کنند را جستجو و انتخاب کنید.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="بستن"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5">
            <Search className="h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="جستجوی مهارت..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
          </div>

          {selectedSkills.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                انتخاب شده ({selectedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <SkillChip key={skill.id} skill={skill} onRemove={onRemoveSkill} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">همه مهارت‌ها</h3>

            {isLoadingSkills ? (
              <p className="text-sm text-text-muted">در حال بارگذاری...</p>
            ) : availableSkills.length === 0 ? (
              <p className="text-sm text-text-muted">موردی پیدا نشد.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 ">
                {availableSkills.map((skill) => (
                  <SkillPill key={skill.id} skill={skill} onSelect={onToggleSkill} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-primary py-3.5 font-medium text-text-on-primary
                       transition-colors hover:bg-primary-hover active:bg-primary-active"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}
