"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnswerValue, QuestionBank, TestSession } from "@/types";
import { uid } from "@/lib/utils";

interface TestState {
  session: TestSession | null;
  bank: QuestionBank | null;
  startTest: (bank: QuestionBank) => void;
  resumeTest: (bank: QuestionBank) => void;
  setBank: (bank: QuestionBank | null) => void;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  toggleMark: (questionId: string) => void;
  setCurrentIndex: (index: number) => void;
  saveRemaining: (remainingSeconds: number) => void;
  complete: () => void;
  clear: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      session: null,
      bank: null,

      startTest: (bank) => {
        const session: TestSession = {
          sessionId: uid("ses"),
          bankId: bank.metadata.id,
          fieldId: bank.metadata.fieldId,
          positionId: bank.metadata.positionId,
          fieldName: bank.metadata.fieldName,
          positionName: bank.metadata.positionName,
          answers: {},
          markedForReview: [],
          currentIndex: 0,
          startedAt: Date.now(),
          remainingSeconds: bank.metadata.duration,
          totalDuration: bank.metadata.duration,
          status: "in-progress",
        };
        set({ session, bank });
      },

      resumeTest: (bank) => {
        const session = get().session;
        if (!session) {
          get().startTest(bank);
          return;
        }
        const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
        const remaining = Math.max(0, session.totalDuration - elapsed);
        set({
          session: {
            ...session,
            remainingSeconds: remaining,
            status: remaining <= 0 ? "completed" : "in-progress",
          },
          bank,
        });
      },

      setBank: (bank) => set({ bank }),

      setAnswer: (questionId, value) => {
        const session = get().session;
        if (!session) return;
        const nextAnswers = { ...session.answers };
        if (value === null) {
          delete nextAnswers[questionId];
        } else {
          nextAnswers[questionId] = value;
        }
        set({
          session: {
            ...session,
            answers: nextAnswers,
          },
        });
      },

      toggleMark: (questionId) => {
        const session = get().session;
        if (!session) return;
        const marked = session.markedForReview.includes(questionId);
        set({
          session: {
            ...session,
            markedForReview: marked
              ? session.markedForReview.filter((id) => id !== questionId)
              : [...session.markedForReview, questionId],
          },
        });
      },

      setCurrentIndex: (index) => {
        const session = get().session;
        if (!session) return;
        set({ session: { ...session, currentIndex: index } });
      },

      saveRemaining: (remainingSeconds) => {
        const session = get().session;
        if (!session) return;
        set({ session: { ...session, remainingSeconds } });
      },

      complete: () => {
        const session = get().session;
        if (!session) return;
        set({
          session: { ...session, status: "completed" },
        });
      },

      clear: () => set({ session: null, bank: null }),
    }),
    {
      name: "psikotes-test-store",
      partialize: (state) => ({ session: state.session }),
    }
  )
);